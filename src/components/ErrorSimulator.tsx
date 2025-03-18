
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import BitDisplay from './BitDisplay';
import TransmissionLine from './TransmissionLine';
import ErrorExplanation from './ErrorExplanation';
import SimulationControls from './SimulationControls';
import MethodSelection from './MethodSelection';
import { useErrorSimulation, ErrorDetectionMethod } from '@/hooks/use-error-simulation';
import { Brain, Cpu, Zap, Globe, AlertTriangle, Info } from 'lucide-react';

interface ErrorSimulatorProps {
  defaultMethod?: ErrorDetectionMethod;
}

const ErrorSimulator: React.FC<ErrorSimulatorProps> = ({ defaultMethod }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<ErrorDetectionMethod | null>(defaultMethod || null);
  const { toast } = useToast();
  
  const {
    state,
    setMessage,
    nextStep,
    resetSimulation,
    autoAdvance,
    setAutoAdvance,
    stepDelay,
    setStepDelay,
  } = useErrorSimulation();

  // Auto-select the method if defaultMethod is provided
  useEffect(() => {
    if (defaultMethod && selectedMethod !== defaultMethod) {
      setSelectedMethod(defaultMethod);
    }
  }, [defaultMethod]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^01]/g, '');
    setInputMessage(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage) {
      toast({
        title: "Message Required",
        description: "Please enter a binary message (0s and 1s).",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedMethod) {
      toast({
        title: "Method Required",
        description: "Please select an error detection method.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setMessage(inputMessage, selectedMethod);
    } catch (error) {
      toast({
        title: "Invalid Message",
        description: "Please enter a valid binary message (only 0s and 1s).",
        variant: "destructive",
      });
    }
  };

  const handleSelectMethod = (method: ErrorDetectionMethod) => {
    setSelectedMethod(method);
  };

  // Get method explanation based on the selected method
  const getMethodExplanation = (method: ErrorDetectionMethod): string => {
    switch (method) {
      case 'parity':
        return "Parity adds an extra bit to ensure an even number of 1s. If a single bit is corrupted, the parity check will fail.";
      case 'checksum':
        return "Checksum adds a sum value calculated from all data bits. The receiver recalculates this sum to detect errors.";
      case 'hamming':
        return "Hamming code adds extra bits that can both detect AND correct single-bit errors through mathematical relationships.";
      case 'crc':
        return "CRC (Cyclic Redundancy Check) treats the message as a polynomial and divides it by a generator polynomial.";
      case 'repetition':
        return "Repetition code repeats each bit multiple times. The receiver uses majority voting to determine the original bit.";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    const { 
      currentStep, 
      originalMessage, 
      encodedMessage, 
      transmittedMessage, 
      errorPositions, 
      detectedError,
      correctedMessage,
      explanationText,
      detectionMethod
    } = state;

    // Step 1: Input (Method Selection)
    if (currentStep === 'input' && originalMessage === '') {
      return (
        <motion.div
          key="input"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="space-y-4">
            {!defaultMethod && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">
                  Select Error Detection Method
                </h2>
                <MethodSelection onSelectMethod={handleSelectMethod} />
              </>
            )}
            
            {selectedMethod && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                {!defaultMethod && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <div className="flex">
                      <div className="mr-3">
                        <Info className="h-5 w-5 text-blue-500" />
                      </div>
                      <p className="text-sm text-blue-700">{getMethodExplanation(selectedMethod)}</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Enter your binary message</h3>
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={handleMessageChange}
                        placeholder="Enter 0s and 1s (e.g., 10101)"
                        className="text-lg"
                        maxLength={16}
                      />
                      <Button type="submit">Start</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Only 0s and 1s allowed. Keep message short (recommended: 4-8 bits)
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      );
    }

    // For other steps, show the simulation visualization
    return (
      <motion.div
        key="simulation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <ErrorExplanation 
          text={explanationText} 
          isError={detectedError && currentStep !== 'correction' && currentStep !== 'complete'} 
          isSuccess={currentStep === 'correction' || currentStep === 'complete'}
        />

        {/* Method explanation header */}
        {detectionMethod && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-indigo-50 p-3 rounded-lg border border-indigo-200 mb-2"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <Info className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="text-sm font-medium text-indigo-800">
                {getMethodExplanation(detectionMethod)}
              </h3>
            </div>
          </motion.div>
        )}

        {/* Sender Side */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Cpu className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">Sender</h3>
          </div>
          
          {originalMessage && (
            <BitDisplay 
              bits={originalMessage} 
              type="sender"
              label="Original Message"
              animationDelay={0.1}
              showExplanation={true}
            />
          )}
          
          {currentStep !== 'input' && encodedMessage && (
            <BitDisplay 
              bits={encodedMessage}
              type={detectionMethod === 'parity' ? 'parity' : 'sender'}
              label={`Encoded Message (${detectionMethod} method)`}
              animationDelay={0.3}
              showExplanation={true}
            />
          )}
        </div>
        
        {/* Transmission */}
        <div className="my-6 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 border border-yellow-300 rounded-full p-2 z-10">
            <Globe className="h-6 w-6 text-yellow-600" />
          </div>
          <TransmissionLine 
            animate={currentStep === 'transmission'} 
            hasErrors={errorPositions.length > 0 && currentStep !== 'input'}
            duration={2} 
          />
          
          {/* Transmission status label */}
          {currentStep === 'transmission' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-2"
            >
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {errorPositions.length > 0 ? "Transmission with errors" : "Clean transmission"}
              </span>
            </motion.div>
          )}
        </div>
        
        {/* Receiver Side */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Brain className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Receiver</h3>
          </div>
          
          {(currentStep === 'corruption' || currentStep === 'detection' || currentStep === 'correction' || currentStep === 'complete') && (
            <BitDisplay 
              bits={transmittedMessage}
              type="corrupted"
              errorPositions={errorPositions}
              label="Received Message"
              animationDelay={0.1}
              showExplanation={true}
            />
          )}
          
          {(currentStep === 'correction' || currentStep === 'complete') && 
           (detectionMethod === 'hamming' || detectionMethod === 'repetition') && (
            <BitDisplay 
              bits={correctedMessage}
              type="corrected"
              errorPositions={errorPositions}
              label={`Corrected Message (${detectionMethod === 'hamming' ? 'After Error Correction' : 'After Majority Voting'})`}
              animationDelay={0.3}
              showExplanation={true}
            />
          )}
        </div>

        <SimulationControls
          onNextStep={nextStep}
          onReset={resetSimulation}
          autoPlay={autoAdvance}
          onToggleAutoPlay={setAutoAdvance}
          currentStep={currentStep}
          isComplete={currentStep === 'complete'}
        />
      </motion.div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden glass-card">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ErrorSimulator;
