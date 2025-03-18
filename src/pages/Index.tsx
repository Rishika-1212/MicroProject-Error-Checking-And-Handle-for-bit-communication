
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Brain, Info } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 blur-xl opacity-30 rounded-full" />
                <div className="relative bg-blue-100 p-4 rounded-full">
                  <Shield className="h-12 w-12 text-blue-500" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-500">
              Error Detection & Correction
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              An interactive visual guide to understanding how computers detect and correct errors during data transmission
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/simulator')}
              className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Simulation
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Learning</h3>
            <p className="text-gray-600">Watch error detection and correction techniques come to life through smooth animations and clear visualizations.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Experience</h3>
            <p className="text-gray-600">Input your own binary messages and see how different error detection methods handle transmission errors.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple Explanations</h3>
            <p className="text-gray-600">Complex concepts explained in simple terms, making error detection accessible to learners of all levels.</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Error Detection & Correction Simulator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
