
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ErrorSimulator from '@/components/ErrorSimulator';

const ParityPage = () => {
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
          <h1 className="text-xl font-semibold text-gray-800">Parity Bit Method</h1>
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
              <h2 className="text-2xl font-bold mb-4">What is Parity Bit Error Detection?</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 mb-4">
                  Parity bit is one of the simplest error detection techniques used in digital communication. 
                  It works by adding an extra bit (called the parity bit) to ensure that the total number of 1s 
                  in the message (including the parity bit) is either even (even parity) or odd (odd parity).
                </p>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">How Parity Bit Works:</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>The sender counts the number of 1s in the original message.</li>
                  <li>For <b>even parity</b>, a parity bit is added to make the total number of 1s even.</li>
                  <li>For <b>odd parity</b>, a parity bit is added to make the total number of 1s odd.</li>
                  <li>The receiver counts the 1s in the received message (including the parity bit).</li>
                  <li>If the count doesn't match the expected parity (even or odd), an error is detected.</li>
                </ol>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                  <h4 className="text-blue-800 font-medium mb-2">Key Limitations:</h4>
                  <ul className="list-disc pl-5 text-blue-700 text-sm">
                    <li>Can only detect odd numbers of bit errors (1, 3, 5, etc.)</li>
                    <li>Cannot detect even numbers of bit errors (2, 4, 6, etc.)</li>
                    <li>Cannot correct errors, only detect them</li>
                    <li>Requires retransmission (ARQ) when errors are detected</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Parity Bit Example</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Example with Even Parity:</h3>
                    <p className="text-gray-700 mb-3">Original message: <code className="bg-gray-100 px-2 py-1 rounded">1011001</code></p>
                    <p className="text-gray-700 mb-3">Number of 1s: <code className="bg-gray-100 px-2 py-1 rounded">4</code> (already even)</p>
                    <p className="text-gray-700 mb-3">Parity bit needed: <code className="bg-gray-100 px-2 py-1 rounded">0</code></p>
                    <p className="text-gray-700 mb-3">Transmitted message: <code className="bg-gray-100 px-2 py-1 rounded">10110010</code></p>
                    
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-800">No Errors:</h4>
                      <p className="text-sm text-green-700">If received as <code className="bg-green-100 px-1 rounded">10110010</code>, count of 1s is 4 (even), so no error detected.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Error Detection Example:</h3>
                    <p className="text-gray-700 mb-3">Transmitted: <code className="bg-gray-100 px-2 py-1 rounded">10110010</code></p>
                    <p className="text-gray-700 mb-3">Error occurs: <code className="bg-red-100 px-2 py-1 rounded">1<span className="font-bold underline">1</span>110010</code> (bit flipped)</p>
                    <p className="text-gray-700 mb-3">Count of 1s: <code className="bg-gray-100 px-2 py-1 rounded">5</code> (odd)</p>
                    
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                      <h4 className="font-medium text-red-800">Error Detected:</h4>
                      <p className="text-sm text-red-700">Expected even parity but found odd number of 1s. Error detected!</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <h4 className="font-medium text-yellow-800">Limitation Example:</h4>
                  <p className="text-sm text-yellow-700">
                    If <b>two</b> bits were flipped: <code className="bg-yellow-100 px-1 rounded">1<span className="font-bold underline">1</span>11<span className="font-bold underline">1</span>010</code>, 
                    the count of 1s would be 6 (even), so no error would be detected despite having two errors!
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Interactive Parity Bit Simulation</h2>
              <p className="mb-6 text-gray-600">
                Try the interactive simulation below to see how parity bit error detection works in practice.
                Enter a binary message, watch as the parity bit is added, and see how errors are detected during transmission.
              </p>
              
              <ErrorSimulator defaultMethod="parity" />
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

export default ParityPage;
