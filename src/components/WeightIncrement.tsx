import { Plus, Minus } from 'lucide-react';

interface WeightIncrementProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
}

const WeightIncrement = ({ value, onChange, onConfirm }: WeightIncrementProps) => {
  const currentValue = parseFloat(value) || 0;

  const handleIncrement = (amount: number) => {
    const newValue = Math.max(0, currentValue + amount);
    onChange(newValue.toFixed(1));
  };

  const handleClear = () => {
    onChange('0.0');
  };

  return (
    <div className="space-y-4">
      {/* Increment Buttons Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Positive increments */}
        <button
          type="button"
          onClick={() => handleIncrement(10)}
          className="weight-btn-positive"
        >
          <Plus className="w-5 h-5 mr-1" />
          10.0
        </button>
        <button
          type="button"
          onClick={() => handleIncrement(1)}
          className="weight-btn-positive"
        >
          <Plus className="w-5 h-5 mr-1" />
          1.0
        </button>
        <button
          type="button"
          onClick={() => handleIncrement(0.1)}
          className="weight-btn-positive"
        >
          <Plus className="w-5 h-5 mr-1" />
          0.1
        </button>
        
        {/* Negative increments */}
        <button
          type="button"
          onClick={() => handleIncrement(-10)}
          className="weight-btn-negative"
        >
          <Minus className="w-5 h-5 mr-1" />
          10.0
        </button>
        <button
          type="button"
          onClick={() => handleIncrement(-1)}
          className="weight-btn-negative"
        >
          <Minus className="w-5 h-5 mr-1" />
          1.0
        </button>
        <button
          type="button"
          onClick={() => handleIncrement(-0.1)}
          className="weight-btn-negative"
        >
          <Minus className="w-5 h-5 mr-1" />
          0.1
        </button>
      </div>

      {/* Action Row */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="weight-btn text-muted-foreground"
        >
          CLEAR
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="weight-btn bg-primary text-primary-foreground border-primary hover:brightness-95"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default WeightIncrement;