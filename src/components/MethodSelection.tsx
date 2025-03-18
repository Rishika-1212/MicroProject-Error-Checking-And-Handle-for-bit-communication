
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ErrorDetectionMethod } from '@/hooks/use-error-simulation';
import { ShieldCheck, Calculator, Binary, Hash, Repeat, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type MethodSelectionProps = {
  onSelectMethod: (method: ErrorDetectionMethod) => void;
};

const methods = [
  {
    id: 'parity',
    title: 'Parity Bit',
    description: 'Simple error detection using an extra bit to ensure even/odd number of 1s.',
    icon: <ShieldCheck className="method-icon" />,
    canDetect: true,
    canCorrect: false,
    complexity: 'Low',
    efficiency: 'Low',
  },
  {
    id: 'checksum',
    title: 'Checksum',
    description: 'Detects errors by adding the sum of data segments and comparing at the receiver.',
    icon: <Calculator className="method-icon" />,
    canDetect: true,
    canCorrect: false,
    complexity: 'Medium',
    efficiency: 'Medium',
  },
  {
    id: 'hamming',
    title: 'Hamming Code',
    description: 'Detects and corrects single-bit errors using strategically placed parity bits.',
    icon: <Binary className="method-icon" />,
    canDetect: true,
    canCorrect: true,
    complexity: 'High',
    efficiency: 'High',
  },
  {
    id: 'crc',
    title: 'CRC',
    description: 'Cyclic Redundancy Check uses polynomial division for robust error detection.',
    icon: <Hash className="method-icon" />,
    canDetect: true,
    canCorrect: false,
    complexity: 'High',
    efficiency: 'High',
  },
  {
    id: 'repetition',
    title: 'Repetition Code',
    description: 'Repeats each bit multiple times and uses majority voting to correct errors.',
    icon: <Repeat className="method-icon" />,
    canDetect: true,
    canCorrect: true,
    complexity: 'Low',
    efficiency: 'Low',
  },
];

const MethodSelection: React.FC<MethodSelectionProps> = ({ onSelectMethod }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {methods.map((method, index) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="hover-rise"
        >
          <Card className="method-card h-full flex flex-col">
            <CardHeader className="pb-2">
              {method.icon}
              <CardTitle className="text-lg">{method.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                {method.description}
              </CardDescription>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Detect Errors:</span>
                  {method.canDetect ? 
                    <Check className="h-3 w-3 text-green-500" /> : 
                    <X className="h-3 w-3 text-red-500" />
                  }
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Correct Errors:</span>
                  {method.canCorrect ? 
                    <Check className="h-3 w-3 text-green-500" /> : 
                    <X className="h-3 w-3 text-red-500" />
                  }
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Complexity:</span>
                  <Badge variant="outline" className="h-5 px-1">
                    {method.complexity}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Efficiency:</span>
                  <Badge variant="outline" className="h-5 px-1">
                    {method.efficiency}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:bg-primary hover:text-white transition-colors"
                onClick={() => onSelectMethod(method.id as ErrorDetectionMethod)}
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MethodSelection;
