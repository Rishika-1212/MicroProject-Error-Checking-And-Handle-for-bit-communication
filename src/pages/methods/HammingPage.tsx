
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Binary } from 'lucide-react';
import ErrorSimulator from '@/components/ErrorSimulator';

const HammingPage = () => {
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
          <h1 className="text-xl font-semibold text-gray-800">Hamming Code Method</h1>
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
              <h2 className="text-2xl font-bold mb-4">What is Hamming Code?</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Binary className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 mb-4">
                      Hamming code is a powerful error detection and correction technique developed by Richard Hamming. 
                      Unlike parity bits and checksums that can only <em>detect</em> errors, Hamming codes can both 
                      detect <strong>and correct</strong> single-bit errors, making them particularly valuable for 
                      applications where retransmission is costly or impossible.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      Hamming codes work by adding multiple parity bits at specific positions, with each parity bit 
                      responsible for checking a specific set of bits in the message.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">How Hamming Code Works:</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Parity bits are placed at positions that are powers of 2 (positions 1, 2, 4, 8, 16, etc.)</li>
                  <li>Data bits fill the remaining positions</li>
                  <li>Each parity bit checks a specific set of bits determined by its position</li>
                  <li>The receiver recalculates the parity bits and determines if and where an error occurred</li>
                  <li>If an error is detected, the position is calculated using the parity bits, and the error is corrected</li>
                </ol>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                  <h4 className="text-blue-800 font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 text-blue-700 text-sm">
                    <li><span className="font-medium">Single-bit error correction:</span> Can automatically fix one error per code word</li>
                    <li><span className="font-medium">Double-bit error detection:</span> Can detect (but not correct) when two bits are wrong</li>
                    <li><span className="font-medium">Efficiency:</span> Requires only ⌈log₂(m+r+1)⌉ parity bits for m data bits</li>
                    <li><span className="font-medium">Applications:</span> Computer memory, satellite communications, storage systems</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Hamming Code Example</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">Example: Hamming(7,4) Code</h3>
                <p className="text-gray-700 mb-4">
                  Let's see how to encode the 4-bit data <code className="bg-gray-100 px-2 py-1 rounded">1011</code> using Hamming(7,4) 
                  code, which adds 3 parity bits to create a 7-bit codeword.
                </p>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Step 1: Position the bits</h4>
                    <div className="grid grid-cols-7 gap-2 text-center mb-3">
                      <div className="p-2 bg-purple-100 border border-purple-200 rounded">
                        <p className="font-bold">p₁</p>
                        <p className="text-xs text-gray-500">Pos 1</p>
                      </div>
                      <div className="p-2 bg-purple-100 border border-purple-200 rounded">
                        <p className="font-bold">p₂</p>
                        <p className="text-xs text-gray-500">Pos 2</p>
                      </div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded">
                        <p className="font-bold">1</p>
                        <p className="text-xs text-gray-500">Pos 3</p>
                      </div>
                      <div className="p-2 bg-purple-100 border border-purple-200 rounded">
                        <p className="font-bold">p₄</p>
                        <p className="text-xs text-gray-500">Pos 4</p>
                      </div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded">
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-500">Pos 5</p>
                      </div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded">
                        <p className="font-bold">1</p>
                        <p className="text-xs text-gray-500">Pos 6</p>
                      </div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded">
                        <p className="font-bold">1</p>
                        <p className="text-xs text-gray-500">Pos 7</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Notice how parity bits (p) are at positions 1, 2, and 4, while data bits occupy the other positions.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Step 2: Calculate parity bits</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1"><span className="font-medium">p₁ (position 1):</span> checks bits at positions 1, 3, 5, 7, ...</p>
                        <p className="text-sm text-gray-600">p₁ checks positions with the 1st bit set in their binary representation</p>
                        <p className="mt-1">p₁ = 1 ⊕ 0 ⊕ 1 = <strong>0</strong></p>
                      </div>
                      
                      <div>
                        <p className="mb-1"><span className="font-medium">p₂ (position 2):</span> checks bits at positions 2, 3, 6, 7, ...</p>
                        <p className="text-sm text-gray-600">p₂ checks positions with the 2nd bit set in their binary representation</p>
                        <p className="mt-1">p₂ = 1 ⊕ 1 ⊕ 1 = <strong>1</strong></p>
                      </div>
                      
                      <div>
                        <p className="mb-1"><span className="font-medium">p₄ (position 4):</span> checks bits at positions 4, 5, 6, 7, ...</p>
                        <p className="text-sm text-gray-600">p₄ checks positions with the 3rd bit set in their binary representation</p>
                        <p className="mt-1">p₄ = 0 ⊕ 1 ⊕ 1 = <strong>0</strong></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-3">Step 3: Final codeword</h4>
                    <div className="grid grid-cols-7 gap-2 text-center">
                      <div className="p-2 bg-green-100 border border-green-200 rounded font-bold">0</div>
                      <div className="p-2 bg-green-100 border border-green-200 rounded font-bold">1</div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded font-bold">1</div>
                      <div className="p-2 bg-green-100 border border-green-200 rounded font-bold">0</div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded font-bold">0</div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded font-bold">1</div>
                      <div className="p-2 bg-blue-100 border border-blue-200 rounded font-bold">1</div>
                    </div>
                    <p className="text-sm text-green-700 mt-3">
                      Final Hamming code: <code className="bg-green-100 px-2 py-1 rounded">0101011</code>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <h4 className="font-medium text-red-800 mb-3">Error Detection and Correction Example</h4>
                    <p className="text-gray-700 mb-3">
                      Let's say during transmission, the codeword <code className="bg-gray-100 px-1 rounded">0101011</code> becomes
                      <code className="bg-gray-100 px-1 rounded">0<span className="text-red-600 font-bold underline">0</span>01011</code> (bit at position 2 flipped).
                    </p>
                    
                    <div className="space-y-3 my-3">
                      <p>Recalculate parity bits at receiver:</p>
                      <p><span className="font-medium">p₁:</span> 1 ⊕ 0 ⊕ 1 = 0 (matches received p₁ = 0) ✓</p>
                      <p><span className="font-medium">p₂:</span> 1 ⊕ 1 ⊕ 1 = 1 (doesn't match received p₂ = 0) ✗</p>
                      <p><span className="font-medium">p₄:</span> 0 ⊕ 1 ⊕ 1 = 0 (matches received p₄ = 0) ✓</p>
                    </div>
                    
                    <p className="mt-3">
                      Error position = 0₁0₂1₄ = 2 (binary 010) - This tells us bit at position 2 is wrong!
                    </p>
                    
                    <p className="mt-3 font-medium text-green-800">
                      Correct the error: Flip bit at position 2 → <code className="bg-green-100 px-1 rounded">0101011</code>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Interactive Hamming Code Simulation</h2>
              <p className="mb-6 text-gray-600">
                Try the interactive simulation below to see how Hamming code works in practice.
                Enter a binary message, watch as Hamming code bits are added, and see how errors are both detected AND corrected during transmission.
              </p>
              
              <ErrorSimulator defaultMethod="hamming" />
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

export default HammingPage;
