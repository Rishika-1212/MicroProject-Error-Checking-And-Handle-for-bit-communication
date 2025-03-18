
import React from 'react';
import { motion } from 'framer-motion';
import { Info, AlertTriangle, CheckCircle, HelpCircle, AlertCircle, Cpu, Zap } from 'lucide-react';

type ErrorExplanationType = 'info' | 'error' | 'success' | 'warning' | 'encoding' | 'detection' | 'correction' | 'transmission';

type ErrorExplanationProps = {
  text: string;
  type?: ErrorExplanationType;
  isError?: boolean;
  isSuccess?: boolean;
  animate?: boolean;
};

const ErrorExplanation: React.FC<ErrorExplanationProps> = ({ 
  text, 
  type = 'info',
  isError = false,
  isSuccess = false,
  animate = true,
}) => {
  // Override type based on isError/isSuccess for backward compatibility
  if (isError) type = 'error';
  if (isSuccess) type = 'success';

  const getConfig = () => {
    switch (type) {
      case 'error':
        return {
          bgColor: 'bg-red-50 border-red-200 text-red-700',
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />
        };
      case 'success':
        return {
          bgColor: 'bg-green-50 border-green-200 text-green-700',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50 border-yellow-200 text-yellow-700',
          icon: <AlertCircle className="h-5 w-5 text-yellow-500" />
        };
      case 'encoding':
        return {
          bgColor: 'bg-blue-50 border-blue-200 text-blue-700',
          icon: <Cpu className="h-5 w-5 text-blue-500" />
        };
      case 'detection':
        return {
          bgColor: 'bg-purple-50 border-purple-200 text-purple-700',
          icon: <AlertCircle className="h-5 w-5 text-purple-500" />
        };
      case 'correction':
        return {
          bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
          icon: <CheckCircle className="h-5 w-5 text-emerald-500" />
        };
      case 'transmission':
        return {
          bgColor: 'bg-amber-50 border-amber-200 text-amber-700',
          icon: <Zap className="h-5 w-5 text-amber-500" />
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50 border-blue-200 text-blue-700',
          icon: <Info className="h-5 w-5 text-blue-500" />
        };
    }
  };

  const { bgColor, icon } = getConfig();

  return (
    <motion.div
      className={`p-4 rounded-lg border ${bgColor} mb-6 shadow-sm`}
      initial={animate ? { opacity: 0, y: 10 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex-grow">
          <p className="text-sm leading-relaxed">{text}</p>
          
          {/* Additional clarification text based on type */}
          {type === 'error' && (
            <p className="text-xs mt-2 text-red-500">
              An error has been detected! In real systems, we would request retransmission or apply error correction.
            </p>
          )}
          
          {type === 'success' && (
            <p className="text-xs mt-2 text-green-500">
              Success! The error detection and correction mechanism has worked as expected.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorExplanation;
