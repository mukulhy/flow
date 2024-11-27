'use client';

interface LeftToolbarProps {
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
}

const LeftToolbar: React.FC<LeftToolbarProps> = ({
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
}) => {
  return (
    <div className="absolute left-0 top-20 p-4 bg-gray-200 space-y-4">
      <div>
        <label>Stroke Color:</label>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
        />
      </div>
      <div>
        <label>Stroke Width:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default LeftToolbar;
