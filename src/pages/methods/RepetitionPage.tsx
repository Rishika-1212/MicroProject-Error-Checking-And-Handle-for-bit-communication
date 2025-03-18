
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Repeat } from 'lucide-react';
import ErrorSimulator from '@/components/ErrorSimulator';

const RepetitionPage = () => {
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
          <h1 className="text-xl font-semibold text-gray-800">Repetition Code Method</h1>
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
              <h2 className="text-2xl font-bold mb-4">What is Repetition Code?</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Repeat className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 mb-4">
                      Repetition code is one of the simplest error correction techniques. It works by repeating 
                      each bit of the original message multiple times (typically 3, 5, or more times), and then 
                      using majority voting at the receiver to determine the original bit.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      While repetition codes are inefficient in terms of bandwidth usage, they are extremely simple 
                      to implement and can provide robust error correction for critical applications where simplicity 
                      and reliability outweigh bandwidth concerns.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">How Repetition Code Works:</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Each bit in the original message is repeated n times (n is odd, typically 3, 5, or 7)</li>
                  <li>The repeats create redundancy that allows for error correction</li>
                  <li>At the receiver, each group of n bits is examined</li>
                  <li>The majority value (0 or 1) is taken as the correct bit</li>
                  <li>This "majority voting" allows correction of up to ⌊(n-1)/2⌋ errors per group</li>
                </ol>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                  <h4 className="text-blue-800 font-medium mb-2">Advantages and Limitations:</h4>
                  <ul className="list-disc pl-5 text-blue-700 text-sm">
                    <li><span className="font-medium">Advantage:</span> Extremely simple to implement</li>
                    <li><span className="font-medium">Advantage:</span> Can correct errors (not just detect them)</li>
                    <li><span className="font-medium">Advantage:</span> Very robust against noise in certain applications</li>
                    <li><span className="font-medium">Limitation:</span> Very inefficient - uses n times the bandwidth</li>
                    <li><span className="font-medium">Limitation:</span> Limited error correction capability per bit</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Repetition Code Example</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">3-Bit Repetition Code Example</h3>
                <p className="text-gray-700 mb-4">
                  Let's encode the message <code className="bg-gray-100 px-2 py-1 rounded">101</code> using a 3-bit repetition code.
                </p>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Step 1: Encoding Process</h4>
                    <div className="grid grid-cols-3 gap-8">
                      <div>
                        <p className="font-medium mb-2">Original bit: <code className="bg-blue-100 px-2 py-1 rounded">1</code></p>
                        <p className="text-gray-700">Encoded as: <code className="bg-green-100 px-2 py-1 rounded">111</code></p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Original bit: <code className="bg-blue-100 px-2 py-1 rounded">0</code></p>
                        <p className="text-gray-700">Encoded as: <code className="bg-green-100 px-2 py-1 rounded">000</code></p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Original bit: <code className="bg-blue-100 px-2 py-1 rounded">1</code></p>
                        <p className="text-gray-700">Encoded as: <code className="bg-green-100 px-2 py-1 rounded">111</code></p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium">Complete encoded message:</p>
                      <code className="bg-green-100 px-2 py-1 rounded block mt-2 text-center">111 000 111</code>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-800 mb-3">Transmission with Errors</h4>
                      <p className="text-gray-700 mb-2">
                        Let's say the message becomes corrupted during transmission:
                      </p>
                      <code className="bg-red-100 px-2 py-1 rounded block">
                        1<span className="text-red-600 font-bold underline">0</span>1 0<span className="text-red-600 font-bold underline">1</span>0 <span className="text-red-600 font-bold underline">0</span>11
                      </code>
                      <p className="text-sm text-gray-600 mt-2">
                        (One bit corrupted in each group)
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-3">Error Correction by Majority Voting</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-700">First group: <code className="bg-gray-100 px-1 rounded">101</code></p>
                          <p className="text-green-700">Majority: <code className="bg-green-100 px-1 rounded">1</code> (2 ones, 1 zero)</p>
                        </div>
                        <div>
                          <p className="text-gray-700">Second group: <code className="bg-gray-100 px-1 rounded">010</code></p>
                          <p className="text-green-700">Majority: <code className="bg-green-100 px-1 rounded">0</code> (2 zeros, 1 one)</p>
                        </div>
                        <div>
                          <p className="text-gray-700">Third group: <code className="bg-gray-100 px-1 rounded">011</code></p>
                          <p className="text-green-700">Majority: <code className="bg-green-100 px-1 rounded">1</code> (2 ones, 1 zero)</p>
                        </div>
                      </div>
                      <div className="mt-4 p-2 bg-white rounded border border-green-200">
                        <p className="font-medium text-green-800">Decoded message: <code className="bg-green-100 px-2 py-1 rounded">101</code></p>
                        <p className="text-sm text-green-700 mt-1">Successfully recovered the original message!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-3">Limitation Example: Too Many Errors</h4>
                    <p className="text-gray-700 mb-2">
                      If two bits in a group of three are corrupted, the majority vote will be incorrect:
                    </p>
                    <div className="mt-3">
                      <p className="text-gray-700">Original triple: <code className="bg-gray-100 px-1 rounded">111</code></p>
                      <p className="text-gray-700">Corrupted triple: <code className="bg-gray-100 px-1 rounded">1<span className="text-red-600 font-bold underline">00</span></code> (two bits flipped)</p>
                      <p className="text-red-700 mt-2">Majority vote: <code className="bg-red-100 px-1 rounded">0</code> (incorrect - we get 1 one, 2 zeros)</p>
                      <p className="text-sm text-yellow-700 mt-2">
                        With 3-bit repetition, we can only correct a single error per group. To correct more errors, 
                        we would need to use a longer repetition code (5-bit, 7-bit, etc.).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Interactive Repetition Code Simulation</h2>
              <p className="mb-6 text-gray-600">
                Try the interactive simulation below to see how repetition code works in practice.
                Enter a binary message, watch as each bit is repeated, and see how errors are both detected AND 
                corrected through majority voting.
              </p>
              
              <ErrorSimulator defaultMethod="repetition" />
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

export default RepetitionPage;
