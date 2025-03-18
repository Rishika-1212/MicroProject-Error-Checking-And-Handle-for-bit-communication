
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check } from 'lucide-react';

type BitDisplayProps = {
  bits: string;
  errorPositions?: number[];
  type: 'sender' | 'corrupted' | 'corrected' | 'parity';
  label: string;
  animationDelay?: number;
  showExplanation?: boolean;
};

const BitDisplay: React.FC<BitDisplayProps> = ({
  bits,
  errorPositions = [],
  type,
  label,
  animationDelay = 0,
  showExplanation = false,
}) => {
  const getClassName = (index: number) => {
    const baseBitClass = "h-10 w-10 flex items-center justify-center rounded-lg text-lg font-mono font-bold shadow-sm relative";
    
    switch (type) {
      case 'sender':
        return `${baseBitClass} bg-blue-100 text-blue-800 border border-blue-300`;
      case 'corrupted':
        return `${baseBitClass} ${
          errorPositions.includes(index) 
            ? 'bg-red-100 text-red-800 border border-red-300' 
            : 'bg-blue-100 text-blue-800 border border-blue-300'
        }`;
      case 'corrected':
        return `${baseBitClass} ${
          errorPositions.includes(index) 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-blue-100 text-blue-800 border border-blue-300'
        }`;
      case 'parity':
        return `${baseBitClass} ${
          index >= bits.length - (type === 'parity' ? 1 : 8) 
            ? 'bg-purple-100 text-purple-800 border border-purple-300' 
            : 'bg-blue-100 text-blue-800 border border-blue-300'
        }`;
      default:
        return `${baseBitClass} bg-blue-100 text-blue-800 border border-blue-300`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: animationDelay,
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const bitVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  // Explanation text for each bit type
  const getTypeExplanation = () => {
    switch (type) {
      case 'parity':
        return "The purple bit is the parity bit, added to ensure an even number of 1s";
      case 'corrupted':
        return errorPositions.length > 0 
          ? "The red bits were corrupted during transmission" 
          : "No bits were corrupted during transmission";
      case 'corrected':
        return "The green bits were corrected using the error detection method";
      default:
        return "";
    }
  };

  return (
    <motion.div 
      className="mb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex items-center mb-2">
        <span className="text-sm font-medium text-gray-600 mr-2">{label}</span>
        {showExplanation && type !== 'sender' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: animationDelay + 0.5 }}
            className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 ml-2"
          >
            {getTypeExplanation()}
          </motion.div>
        )}
      </motion.div>
      
      <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
        {bits.split('').map((bit, index) => (
          <motion.div
            key={index}
            className={getClassName(index)}
            variants={bitVariants}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            {bit}
            
            {/* Position indicator below each bit */}
            <div className="absolute -bottom-5 left-0 right-0 text-xs text-gray-500 text-center">
              {index + 1}
            </div>
            
            {/* Error or correction indicator */}
            {type === 'corrupted' && errorPositions.includes(index) && (
              <motion.div 
                className="absolute -top-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: animationDelay + 0.3 + (index * 0.05) }}
              >
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </motion.div>
            )}
            
            {type === 'corrected' && errorPositions.includes(index) && (
              <motion.div 
                className="absolute -top-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: animationDelay + 0.3 + (index * 0.05) }}
              >
                <Check className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BitDisplay;
