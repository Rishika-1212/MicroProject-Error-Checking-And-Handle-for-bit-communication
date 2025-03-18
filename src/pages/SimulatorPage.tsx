
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, ArrowRight, ShieldCheck, Calculator, Binary, Hash, Repeat, BookOpen } from 'lucide-react';
import ErrorSimulator from '@/components/ErrorSimulator';

const SimulatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="w-full px-4 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Error Detection Simulator</h1>
          <div className="w-[100px]"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 tracking-tight">
              Interactive Error Simulation
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a detection method, input your binary message, and watch as the system detects and corrects errors in real-time.
            </p>
          </div>

          <div className="space-y-8">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Error Detection Methods</h2>
              <p className="text-gray-600 mb-8">
                Each method below has a dedicated page with detailed explanations, examples, and interactive simulations.
                Click on a method to learn more and try it out!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Parity Bit",
                    icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
                    description: "Simple error detection using an extra bit to ensure even/odd number of 1s.",
                    path: "/methods/parity",
                    color: "blue"
                  },
                  {
                    title: "Checksum",
                    icon: <Calculator className="h-8 w-8 text-green-500" />,
                    description: "Detects errors by adding the sum of data segments and comparing at the receiver.",
                    path: "/methods/checksum",
                    color: "green"
                  },
                  {
                    title: "Hamming Code",
                    icon: <Binary className="h-8 w-8 text-purple-500" />,
                    description: "Detects and corrects single-bit errors using strategically placed parity bits.",
                    path: "/methods/hamming",
                    color: "purple"
                  },
                  {
                    title: "CRC",
                    icon: <Hash className="h-8 w-8 text-indigo-500" />,
                    description: "Cyclic Redundancy Check uses polynomial division for robust error detection.",
                    path: "/methods/crc",
                    color: "indigo"
                  },
                  {
                    title: "Repetition Code",
                    icon: <Repeat className="h-8 w-8 text-amber-500" />,
                    description: "Repeats each bit multiple times and uses majority voting to correct errors.",
                    path: "/methods/repetition",
                    color: "amber"
                  },
                ].map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <Card className="h-full">
                      <CardHeader className={`bg-${method.color}-50 border-b border-${method.color}-100`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-${method.color}-100 rounded-lg`}>
                            {method.icon}
                          </div>
                          <CardTitle className="text-xl">{method.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardDescription className="text-gray-600 mb-4">
                          {method.description}
                        </CardDescription>
                        <Link to={method.path}>
                          <Button variant="outline" className="w-full group">
                            <span className="mr-2">Learn More</span>
                            <BookOpen className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Quick Simulation</h2>
              <p className="text-gray-600 mb-6">
                Want to try a simulation right away? Select a method below and start experimenting:
              </p>
              
              <ErrorSimulator />
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

export default SimulatorPage;
