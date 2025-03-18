import { useState, useEffect, useCallback } from 'react';

// Types for the simulation
export type ErrorDetectionMethod = 'parity' | 'checksum' | 'hamming' | 'crc' | 'repetition';

export type SimulationStep = 
  | 'input'                 // Initial input state
  | 'encoding'              // Encoding the message
  | 'transmission'          // Message being transmitted
  | 'corruption'            // Message being corrupted
  | 'detection'             // Error detection
  | 'correction'            // Error correction if applicable
  | 'complete';             // Simulation complete

export type SimulationState = {
  originalMessage: string;
  encodedMessage: string;
  transmittedMessage: string;
  detectedError: boolean;
  errorPositions: number[];
  correctedMessage: string;
  currentStep: SimulationStep;
  detectionMethod: ErrorDetectionMethod;
  explanationText: string;
};

const DEFAULT_STATE: SimulationState = {
  originalMessage: '',
  encodedMessage: '',
  transmittedMessage: '',
  detectedError: false,
  errorPositions: [],
  correctedMessage: '',
  currentStep: 'input',
  detectionMethod: 'parity',
  explanationText: 'Enter a binary message to begin the simulation.',
};

export const useErrorSimulation = () => {
  const [state, setState] = useState<SimulationState>(DEFAULT_STATE);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [stepDelay, setStepDelay] = useState(2000); // 2 seconds between steps
  
  // Reset the simulation
  const resetSimulation = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  // Set the original message and initialize the simulation
  const setMessage = useCallback((message: string, method: ErrorDetectionMethod) => {
    if (!/^[01]+$/.test(message)) {
      throw new Error('Message must contain only 0s and 1s');
    }
    
    setState({
      ...DEFAULT_STATE,
      originalMessage: message,
      detectionMethod: method,
      currentStep: 'input',
      explanationText: `You've entered the message "${message}". Let's start the simulation.`,
    });
  }, []);

  // Calculate even parity for a message
  const calculateEvenParity = useCallback((message: string): string => {
    const ones = message.split('').filter(bit => bit === '1').length;
    return ones % 2 === 0 ? '0' : '1';
  }, []);

  // Add a single parity bit to the end of a message
  const addParityBit = useCallback((message: string): string => {
    const parityBit = calculateEvenParity(message);
    return message + parityBit;
  }, [calculateEvenParity]);

  // Calculate checksum for a message
  const calculateChecksum = useCallback((message: string): string => {
    if (message.length % 8 !== 0) {
      // Pad the message to be divisible by 8
      message = message.padStart(Math.ceil(message.length / 8) * 8, '0');
    }
    
    // Split message into 8-bit chunks
    const chunks = [];
    for (let i = 0; i < message.length; i += 8) {
      chunks.push(message.slice(i, i + 8));
    }
    
    // Calculate sum of chunks
    let sum = 0;
    for (const chunk of chunks) {
      sum += parseInt(chunk, 2);
    }
    
    // Take the 8 least significant bits
    sum = sum % 256;
    
    // Return 1's complement (flip all bits)
    const checksum = (255 - sum).toString(2).padStart(8, '0');
    return checksum;
  }, []);

  // Add checksum to the message
  const addChecksum = useCallback((message: string): string => {
    const checksum = calculateChecksum(message);
    return message + checksum;
  }, [calculateChecksum]);

  // Hamming code generation (simplified for demonstration)
  const addHammingCode = useCallback((message: string): string => {
    // This is a simplified implementation for demonstration
    // In a real implementation, we would calculate the actual hamming code
    
    // Calculate the number of parity bits needed
    const m = message.length;
    let r = 0;
    while ((1 << r) < m + r + 1) {
      r++;
    }
    
    // Initialize the encoded message with placeholders for parity bits
    const encoded = new Array(m + r).fill('_');
    
    // Fill in the data bits
    let dataIndex = 0;
    for (let i = 1; i < encoded.length + 1; i++) {
      // If i is a power of 2, it's a parity bit position
      if ((i & (i - 1)) !== 0) {
        encoded[i - 1] = message[dataIndex++];
      }
    }
    
    // Calculate and set parity bits
    for (let i = 0; i < r; i++) {
      const parityPosition = (1 << i) - 1;
      let parity = 0;
      
      // Check all bits that include this parity bit in their coverage
      for (let j = parityPosition; j < encoded.length; j++) {
        if (((j + 1) & (1 << i)) !== 0 && encoded[j] === '1') {
          parity ^= 1;
        }
      }
      
      encoded[parityPosition] = parity.toString();
    }
    
    return encoded.join('');
  }, []);

  // CRC calculation (simplified)
  const addCRC = useCallback((message: string, polynomial = '1011'): string => {
    // Append zeros to the message (length of polynomial - 1)
    const zeros = '0'.repeat(polynomial.length - 1);
    const messageWithZeros = message + zeros;
    
    // Perform long division
    let remainder = messageWithZeros.slice(0, polynomial.length);
    
    for (let i = polynomial.length; i <= messageWithZeros.length; i++) {
      if (remainder[0] === '1') {
        // XOR with polynomial
        let xorResult = '';
        for (let j = 1; j < polynomial.length; j++) {
          xorResult += (remainder[j] === polynomial[j]) ? '0' : '1';
        }
        remainder = xorResult + (i < messageWithZeros.length ? messageWithZeros[i] : '');
      } else {
        // XOR with zeros
        remainder = remainder.slice(1) + (i < messageWithZeros.length ? messageWithZeros[i] : '');
      }
    }
    
    // Remainder is the CRC
    return message + remainder;
  }, []);

  // Add repetition code (repeat each bit 3 times)
  const addRepetitionCode = useCallback((message: string): string => {
    let encoded = '';
    for (let i = 0; i < message.length; i++) {
      encoded += message[i].repeat(3);
    }
    return encoded;
  }, []);

  // Encode the message based on the selected method
  const encodeMessage = useCallback(() => {
    const { originalMessage, detectionMethod } = state;
    let encodedMessage = '';
    let explanationText = '';
    
    switch (detectionMethod) {
      case 'parity':
        encodedMessage = addParityBit(originalMessage);
        explanationText = `We've added a parity bit (${encodedMessage.slice(-1)}) to ensure an even number of 1s.`;
        break;
      case 'checksum':
        encodedMessage = addChecksum(originalMessage);
        explanationText = `We've calculated and added an 8-bit checksum (${encodedMessage.slice(-8)}) to the message.`;
        break;
      case 'hamming':
        encodedMessage = addHammingCode(originalMessage);
        explanationText = "We've added Hamming code bits to allow for error detection and correction.";
        break;
      case 'crc':
        encodedMessage = addCRC(originalMessage);
        explanationText = `We've calculated and added a CRC remainder (${encodedMessage.slice(-3)}) using polynomial division.`;
        break;
      case 'repetition':
        encodedMessage = addRepetitionCode(originalMessage);
        explanationText = "We've tripled each bit to create a repetition code for error detection.";
        break;
      default:
        encodedMessage = originalMessage;
        explanationText = 'No encoding method applied.';
    }
    
    setState(prev => ({
      ...prev,
      encodedMessage,
      explanationText,
      currentStep: 'encoding'
    }));
  }, [state, addParityBit, addChecksum, addHammingCode, addCRC, addRepetitionCode]);

  // Simulate transmission with possible corruption
  const simulateTransmission = useCallback(() => {
    const { encodedMessage } = state;
    let transmittedMessage = encodedMessage;
    let errorPositions: number[] = [];
    
    // Randomly introduce 1-2 bit errors with 80% probability
    if (Math.random() < 0.8) {
      const numErrors = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numErrors; i++) {
        const position = Math.floor(Math.random() * transmittedMessage.length);
        // Flip the bit at this position
        const bit = transmittedMessage[position];
        transmittedMessage = 
          transmittedMessage.substring(0, position) + 
          (bit === '0' ? '1' : '0') + 
          transmittedMessage.substring(position + 1);
        errorPositions.push(position);
      }
    }
    
    setState(prev => ({
      ...prev,
      transmittedMessage,
      errorPositions,
      currentStep: 'transmission',
      explanationText: errorPositions.length > 0 
        ? `The message is being transmitted, but some bits were corrupted during transmission.`
        : `The message is being transmitted without any corruption.`
    }));
    
    // Move to corruption step after a delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStep: 'corruption',
        explanationText: errorPositions.length > 0 
          ? `Bits at positions ${errorPositions.map(p => p + 1).join(', ')} were corrupted during transmission.`
          : `The message was transmitted successfully without any corruption.`
      }));
    }, stepDelay);
  }, [state, stepDelay]);

  // Detect errors based on the selected method
  const detectErrors = useCallback(() => {
    const { originalMessage, encodedMessage, transmittedMessage, detectionMethod, errorPositions } = state;
    let detectedError = false;
    let explanationText = '';
    let correctedMessage = transmittedMessage;
    
    switch (detectionMethod) {
      case 'parity':
        // Check if parity is maintained
        const receivedParityBit = transmittedMessage.slice(-1);
        const calculatedParityBit = calculateEvenParity(transmittedMessage.slice(0, -1));
        detectedError = receivedParityBit !== calculatedParityBit;
        
        explanationText = detectedError 
          ? `Error detected! The received parity bit (${receivedParityBit}) doesn't match the calculated parity (${calculatedParityBit}).`
          : `No error detected. The parity check passed.`;
        break;
      
      case 'checksum':
        // Extract checksum from transmitted message
        const receivedChecksum = transmittedMessage.slice(-8);
        const messageWithoutChecksum = transmittedMessage.slice(0, -8);
        
        // Calculate checksum for the received message
        const calculatedChecksum = calculateChecksum(messageWithoutChecksum);
        
        detectedError = receivedChecksum !== calculatedChecksum;
        
        explanationText = detectedError 
          ? `Error detected! The received checksum (${receivedChecksum}) doesn't match the calculated checksum (${calculatedChecksum}).`
          : `No error detected. The checksum verification passed.`;
        break;
      
      case 'hamming':
        // Calculate syndrome to locate errors
        const r = Math.log2(transmittedMessage.length + 1) | 0;
        let syndrome = 0;
        
        for (let i = 0; i < r; i++) {
          const parityPosition = (1 << i) - 1;
          let parity = 0;
          
          for (let j = 0; j < transmittedMessage.length; j++) {
            if (((j + 1) & (1 << i)) !== 0 && transmittedMessage[j] === '1') {
              parity ^= 1;
            }
          }
          
          if (parity !== 0) {
            syndrome |= (1 << i);
          }
        }
        
        if (syndrome !== 0) {
          detectedError = true;
          // Correct the error if detected
          const errorPosition = syndrome - 1;
          if (errorPosition >= 0 && errorPosition < transmittedMessage.length) {
            const bit = transmittedMessage[errorPosition];
            correctedMessage = 
              transmittedMessage.substring(0, errorPosition) +
              (bit === '0' ? '1' : '0') +
              transmittedMessage.substring(errorPosition + 1);
            
            explanationText = `Error detected at position ${errorPosition + 1}! The Hamming code has identified and can correct this error.`;
          } else {
            explanationText = `Error detected but couldn't be located precisely. Multiple errors may exist.`;
          }
        } else {
          explanationText = `No error detected. The Hamming code verification passed.`;
        }
        break;
      
      case 'crc':
        // Check if received message is divisible by the generator polynomial
        const polynomial = '1011'; // Using a simple polynomial for demonstration
        const remainder = addCRC(transmittedMessage.slice(0, -3), polynomial).slice(-3);
        const receivedRemainder = transmittedMessage.slice(-3);
        
        detectedError = remainder !== receivedRemainder;
        
        explanationText = detectedError 
          ? `Error detected! The CRC check failed. The calculated remainder (${remainder}) doesn't match the received remainder (${receivedRemainder}).`
          : `No error detected. The CRC check passed.`;
        break;
      
      case 'repetition':
        // Check each group of 3 bits and determine the original bit by majority vote
        let detectedErrorPositions = [];
        let corrected = '';
        
        for (let i = 0; i < transmittedMessage.length; i += 3) {
          const triplet = transmittedMessage.slice(i, i + 3);
          const ones = triplet.split('').filter(bit => bit === '1').length;
          
          // Majority vote determines the correct bit
          const correctBit = ones >= 2 ? '1' : '0';
          corrected += correctBit;
          
          // Check if there was an error in this triplet
          if (triplet !== correctBit.repeat(3)) {
            detectedErrorPositions.push(i);
          }
        }
        
        detectedError = detectedErrorPositions.length > 0;
        correctedMessage = corrected;
        
        explanationText = detectedError 
          ? `Errors detected in ${detectedErrorPositions.length} triplets! The repetition code allows us to correct these errors through majority voting.`
          : `No errors detected. The repetition code verification passed.`;
        break;
      
      default:
        explanationText = 'No error detection method applied.';
    }
    
    setState(prev => ({
      ...prev,
      detectedError,
      correctedMessage,
      currentStep: 'detection',
      explanationText
    }));
  }, [state, calculateEvenParity, calculateChecksum, addCRC]);

  // Correct errors if possible
  const correctErrors = useCallback(() => {
    const { detectionMethod, detectedError, correctedMessage, errorPositions } = state;
    
    if (!detectedError) {
      setState(prev => ({
        ...prev,
        currentStep: 'complete',
        explanationText: 'No errors were detected, so no correction was needed. The transmission was successful!'
      }));
      return;
    }
    
    let explanationText = '';
    
    switch (detectionMethod) {
      case 'parity':
        explanationText = 'Parity checking can only detect errors, not correct them. To fix this, we would need to request retransmission (ARQ).';
        break;
      
      case 'checksum':
        explanationText = 'Checksum can only detect errors, not correct them. To fix this, we would need to request retransmission (ARQ).';
        break;
      
      case 'hamming':
        explanationText = `The error has been corrected using Hamming code's error correction capability. The original message has been restored.`;
        break;
      
      case 'crc':
        explanationText = 'CRC can only detect errors, not correct them. To fix this, we would need to request retransmission (ARQ).';
        break;
      
      case 'repetition':
        explanationText = `The errors have been corrected using majority voting. Each group of three bits was analyzed to determine the most likely original bit.`;
        break;
      
      default:
        explanationText = 'No error correction method applied.';
    }
    
    setState(prev => ({
      ...prev,
      currentStep: 'correction',
      explanationText
    }));
    
    // Move to complete step after a delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStep: 'complete',
        explanationText: detectionMethod === 'hamming' || detectionMethod === 'repetition'
          ? `Simulation complete! The ${detectionMethod} code successfully detected and corrected the errors.`
          : `Simulation complete! The ${detectionMethod} method detected errors but couldn't correct them automatically. In a real system, we would request retransmission.`
      }));
    }, stepDelay);
  }, [state, stepDelay]);

  // Advance to the next step manually
  const nextStep = useCallback(() => {
    const { currentStep } = state;
    
    switch (currentStep) {
      case 'input':
        encodeMessage();
        break;
      case 'encoding':
        simulateTransmission();
        break;
      case 'corruption':
        detectErrors();
        break;
      case 'detection':
        correctErrors();
        break;
      case 'correction':
      case 'complete':
        resetSimulation();
        break;
      default:
        break;
    }
  }, [state, encodeMessage, simulateTransmission, detectErrors, correctErrors, resetSimulation]);

  // Auto advance through steps if enabled
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoAdvance && state.currentStep !== 'input' && state.currentStep !== 'complete') {
      timer = setTimeout(nextStep, stepDelay);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [autoAdvance, state.currentStep, nextStep, stepDelay]);

  return {
    state,
    setMessage,
    nextStep,
    resetSimulation,
    autoAdvance,
    setAutoAdvance,
    stepDelay,
    setStepDelay,
  };
};
