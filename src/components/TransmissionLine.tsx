
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio, AlertTriangle } from 'lucide-react';

type TransmissionLineProps = {
  animate: boolean;
  duration?: number;
  hasErrors?: boolean;
};

const TransmissionLine: React.FC<TransmissionLineProps> = ({ 
  animate, 
  duration = 2,
  hasErrors = false
}) => {
  return (
    <div className="transmission-line-container relative my-8">
      {/* Sender and receiver nodes */}
      <div className="flex justify-between items-center mb-2">
        <div className="bg-blue-100 rounded-full p-2 border border-blue-200">
          <Radio className="h-5 w-5 text-blue-600" />
        </div>
        <div className="bg-green-100 rounded-full p-2 border border-green-200">
          <Radio className="h-5 w-5 text-green-600" />
        </div>
      </div>
      
      {/* Base transmission line */}
      <div className="transmission-line relative h-10 bg-gray-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 border border-gray-300 rounded-full"></div>
        
        {/* Data packets visualized */}
        {animate && (
          <>
            <motion.div
              className="transmission-pulse bg-blue-400 h-full w-10 rounded-full opacity-70"
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{
                duration: duration * 0.7,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.5
              }}
            />
            
            <motion.div
              className="transmission-pulse bg-blue-500 h-full w-6 rounded-full opacity-60"
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.3,
                repeatDelay: 0.7
              }}
            />
            
            {/* Small data packets */}
            <motion.div
              className="transmission-pulse bg-blue-300 h-3/5 w-4 rounded-full opacity-50 top-1/5 absolute"
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{
                duration: duration * 1.2,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.1,
                repeatDelay: 0.3
              }}
            />
            
            <motion.div
              className="transmission-pulse bg-blue-300 h-3/5 w-3 rounded-full opacity-40 top-1/5 absolute"
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{
                duration: duration * 0.9,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.8,
                repeatDelay: 0.2
              }}
            />
            
            {/* Error visualization */}
            {hasErrors && (
              <>
                <motion.div
                  className="absolute"
                  initial={{ left: '40%', opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: [0, -20, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1.5
                  }}
                >
                  <Zap className="h-6 w-6 text-yellow-500" />
                </motion.div>
                
                <motion.div
                  className="absolute"
                  initial={{ left: '65%', opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: [0, -15, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.8,
                    repeatDelay: 1.2
                  }}
                >
                  <Zap className="h-5 w-5 text-yellow-500" />
                </motion.div>
                
                {/* Interference indicator */}
                <motion.div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
                    <AlertTriangle className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-700">Transmission interference detected</span>
                  </div>
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
      
      {/* Transmission labels */}
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">Sender</span>
        <span className="text-xs text-gray-500">Receiver</span>
      </div>
      
      {/* Explanatory text */}
      {animate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-gray-600">
            {hasErrors 
              ? "During transmission, environmental interference can cause bits to flip from 0 to 1, or vice versa." 
              : "Data is transmitted as a stream of bits (0s and 1s) across the communication channel."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TransmissionLine;
