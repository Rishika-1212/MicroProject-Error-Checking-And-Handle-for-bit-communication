
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  RotateCcw, 
  FastForward, 
  Pause, 
  AlertCircle,
  HelpCircle 
} from 'lucide-react';

type SimulationControlsProps = {
  onNextStep: () => void;
  onReset: () => void;
  autoPlay: boolean;
  onToggleAutoPlay: (state: boolean) => void;
  currentStep: string;
  isComplete: boolean;
};

const SimulationControls: React.FC<SimulationControlsProps> = ({
  onNextStep,
  onReset,
  autoPlay,
  onToggleAutoPlay,
  currentStep,
  isComplete,
}) => {
  const getNextButtonText = () => {
    switch (currentStep) {
      case 'input':
        return 'Encode';
      case 'encoding':
        return 'Transmit';
      case 'transmission':
      case 'corruption':
        return 'Detect';
      case 'detection':
        return 'Correct';
      case 'correction':
      case 'complete':
        return 'Restart';
      default:
        return 'Next';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
      <Button 
        onClick={onNextStep}
        className="hover:shadow-md transition-all"
        variant="default"
      >
        {isComplete ? <RotateCcw className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
        {getNextButtonText()}
      </Button>

      <Button
        variant="outline"
        onClick={() => onToggleAutoPlay(!autoPlay)}
        className="hover:shadow-md transition-all"
      >
        {autoPlay ? (
          <>
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </>
        ) : (
          <>
            <FastForward className="w-4 h-4 mr-2" />
            Auto Play
          </>
        )}
      </Button>

      {currentStep !== 'input' && (
        <Button
          variant="outline"
          onClick={onReset}
          className="hover:shadow-md transition-all"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      )}
    </div>
  );
};

export default SimulationControls;
