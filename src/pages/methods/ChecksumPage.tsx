
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ErrorSimulator from '@/components/ErrorSimulator';

const ChecksumPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="w-full px-4 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/simulator')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Simulator
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Checksum Method</h1>
          <div className="w-[100px]"></div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">What is Checksum Error Detection?</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 mb-4">
                  Checksum is a more robust error detection method than parity bit. It involves calculating a value 
                  (the checksum) based on the data being transmitted and sending this value along with the original data. 
                  The receiver then recalculates the checksum and compares it with the received checksum value.
                </p>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">How Checksum Works:</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>The sender divides the message into fixed-size blocks (typically 8, 16, or 32 bits).</li>
                  <li>These blocks are summed together using arithmetic addition.</li>
                  <li>The sum is often complemented (all bits flipped) to form the checksum.</li>
                  <li>The checksum is appended to the original message and transmitted.</li>
                  <li>The receiver performs the same calculation on the received data blocks.</li>
                  <li>If the calculated checksum doesn't match the received checksum, an error is detected.</li>
                </ol>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                  <h4 className="text-blue-800 font-medium mb-2">Advantages and Limitations:</h4>
                  <ul className="list-disc pl-5 text-blue-700 text-sm">
                    <li><span className="font-medium">Advantage:</span> Can detect multiple bit errors and some data reordering errors</li>
                    <li><span className="font-medium">Advantage:</span> More reliable than simple parity checking</li>
                    <li><span className="font-medium">Limitation:</span> Cannot detect errors if they cancel each other out in the sum</li>
                    <li><span className="font-medium">Limitation:</span> Cannot correct errors, only detect them</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Checksum Example</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">Simple 8-bit Checksum Example:</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-1">Data Block 1:</h4>
                      <code className="bg-gray-100 px-2 py-1 rounded block text-center">10110011</code>
                      <p className="text-xs text-gray-500 mt-1 text-center">(Binary: 179)</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-1">Data Block 2:</h4>
                      <code className="bg-gray-100 px-2 py-1 rounded block text-center">01101100</code>
                      <p className="text-xs text-gray-500 mt-1 text-center">(Binary: 108)</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-1">Sum:</h4>
                      <code className="bg-gray-100 px-2 py-1 rounded block text-center">00100000</code>
                      <p className="text-xs text-gray-500 mt-1 text-center">(Binary: 287 % 256 = 31)</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-1">One's Complement (Checksum):</h4>
                    <code className="bg-indigo-100 px-2 py-1 rounded block text-center">11011111</code>
                    <p className="text-xs text-indigo-500 mt-1 text-center">(Flip all bits: 255 - 31 = 224)</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-1">Transmitted Data:</h4>
                    <code className="bg-green-100 px-2 py-1 rounded block">10110011 01101100 11011111</code>
                    <p className="text-xs text-green-500 mt-1">Original data blocks + checksum</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">No Error Case:</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-700 mb-2">Received: <code className="bg-gray-100 px-1 rounded">10110011 01101100 11011111</code></p>
                      <p className="text-gray-700 mb-2">Sum blocks: <code className="bg-gray-100 px-1 rounded">10110011 + 01101100 = 00100000</code></p>
                      <p className="text-gray-700 mb-2">Add checksum: <code className="bg-gray-100 px-1 rounded">00100000 + 11011111 = 11111111</code></p>
                      <div className="mt-3 p-2 bg-green-50 rounded border border-green-100">
                        <p className="text-sm text-green-700"><span className="font-medium">Result:</span> All 1s = No error detected!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Error Case:</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-700 mb-2">Received (with error): <code className="bg-gray-100 px-1 rounded">1011<span className="text-red-500 font-bold underline">1</span>011 01101100 11011111</code></p>
                      <p className="text-gray-700 mb-2">Sum blocks: <code className="bg-gray-100 px-1 rounded">10111011 + 01101100 = 00101000</code></p>
                      <p className="text-gray-700 mb-2">Add checksum: <code className="bg-gray-100 px-1 rounded">00101000 + 11011111 = 00001000</code></p>
                      <div className="mt-3 p-2 bg-red-50 rounded border border-red-100">
                        <p className="text-sm text-red-700"><span className="font-medium">Result:</span> Not all 1s = Error detected!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Interactive Checksum Simulation</h2>
              <p className="mb-6 text-gray-600">
                Try the interactive simulation below to see how checksum error detection works in practice.
                Enter a binary message, watch as the checksum is calculated and added, and see how errors are detected during transmission.
              </p>
              
              <ErrorSimulator defaultMethod="checksum" />
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="w-full py-6 border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Error Detection & Correction Simulator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ChecksumPage;
