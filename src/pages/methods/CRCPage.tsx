
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Hash } from 'lucide-react';
import ErrorSimulator from '@/components/ErrorSimulator';

const CRCPage = () => {
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
          <h1 className="text-xl font-semibold text-gray-800">CRC Method</h1>
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
              <h2 className="text-2xl font-bold mb-4">What is Cyclic Redundancy Check (CRC)?</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Hash className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 mb-4">
                      Cyclic Redundancy Check (CRC) is a powerful error detection technique widely used in digital networks 
                      and storage devices. It treats data as a binary polynomial and performs polynomial division by a 
                      generator polynomial, then appends the remainder as a checksum.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      CRC is more robust than simple parity or checksum methods and can detect a wide range of errors, 
                      including burst errors (multiple consecutive bit errors).
                    </p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">How CRC Works:</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Choose a generator polynomial (predefined standards exist, like CRC-16, CRC-32)</li>
                  <li>Append zeros to the message (equal to generator polynomial degree)</li>
                  <li>Perform binary polynomial long division</li>
                  <li>Use the remainder (the CRC) as the checksum</li>
                  <li>Transmit the original message followed by the CRC</li>
                  <li>At the receiver, perform the same division on the entire received data</li>
                  <li>If the remainder is zero, no errors detected; otherwise, errors exist</li>
                </ol>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                  <h4 className="text-blue-800 font-medium mb-2">Key Advantages:</h4>
                  <ul className="list-disc pl-5 text-blue-700 text-sm">
                    <li><span className="font-medium">High error detection capability:</span> Can detect all single-bit errors, all double-bit errors, any odd number of errors, and most burst errors</li>
                    <li><span className="font-medium">Efficiency:</span> Simple to implement in hardware with shift registers</li>
                    <li><span className="font-medium">Standardization:</span> Well-established standards like CRC-16, CRC-32 are used in Ethernet, ZIP files, etc.</li>
                    <li><span className="font-medium">Limitation:</span> Cannot correct errors, only detect them</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">CRC Example</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">Simple CRC Example with Generator G(x) = x³ + x + 1</h3>
                <p className="text-gray-700 mb-4">
                  Let's calculate the CRC for the message <code className="bg-gray-100 px-2 py-1 rounded">1101</code> using 
                  the generator polynomial <code className="bg-gray-100 px-2 py-1 rounded">1011</code> (representing x³ + x + 1).
                </p>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Step 1: Append zeros</h4>
                    <p className="text-gray-700">
                      Append 3 zeros (degree of generator polynomial) to the message:
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <p className="font-medium">Original message:</p>
                      <code className="bg-gray-100 px-2 py-1 rounded">1101</code>
                      <p className="font-medium ml-4">After appending zeros:</p>
                      <code className="bg-gray-100 px-2 py-1 rounded">1101<span className="text-blue-600 font-bold">000</span></code>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Step 2: Polynomial Division</h4>
                    <p className="text-gray-700 mb-3">
                      Perform binary polynomial long division (XOR operation):
                    </p>
                    
                    <div className="font-mono text-sm p-3 bg-gray-100 rounded overflow-x-auto whitespace-pre">
                      1011 ) 1101000
                             1011
                             ----
                              1100
                              1011
                              ----
                               1110
                               1011
                               ----
                                1010
                                1011
                                ----
                                 001 ← Remainder (CRC)
                    </div>
                    
                    <p className="text-gray-700 mt-3">
                      The remainder is <code className="bg-blue-100 px-2 py-1 rounded">001</code>, which is our CRC value.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-3">Step 3: Final codeword</h4>
                    <p className="text-gray-700">
                      Append the CRC to the original message:
                    </p>
                    <div className="mt-2">
                      <p className="text-green-700 font-medium">
                        Transmitted message: <code className="bg-green-100 px-2 py-1 rounded">1101<span className="text-blue-600 font-bold">001</span></code>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        (Original message + CRC)
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-3">Verification (No errors)</h4>
                      <p className="text-gray-700 mb-2">
                        At the receiver, divide the entire received message by the generator:
                      </p>
                      <div className="font-mono text-xs p-2 bg-gray-100 rounded overflow-x-auto whitespace-pre">
                        1011 ) 1101001
                               1011
                               ----
                                1100
                                1011
                                ----
                                 1110
                                 1011
                                 ----
                                  1010
                                  1011
                                  ----
                                   001
                                   001
                                   ----
                                    000 ← Zero remainder = No errors!
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-800 mb-3">Error Detection</h4>
                      <p className="text-gray-700 mb-2">
                        If bit 3 is flipped during transmission: <code className="bg-gray-100 px-1 rounded">1<span className="text-red-600 font-bold underline">0</span>01001</code>
                      </p>
                      <div className="font-mono text-xs p-2 bg-gray-100 rounded overflow-x-auto whitespace-pre">
                        1011 ) 1001001
                               1011
                               ----
                                0101
                                0000
                                ----
                                 1010
                                 1011
                                 ----
                                  0010 ← Non-zero remainder = Error detected!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Interactive CRC Simulation</h2>
              <p className="mb-6 text-gray-600">
                Try the interactive simulation below to see how CRC error detection works in practice.
                Enter a binary message, watch as the CRC is calculated, and see how errors are detected during transmission.
              </p>
              
              <ErrorSimulator defaultMethod="crc" />
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

export default CRCPage;
