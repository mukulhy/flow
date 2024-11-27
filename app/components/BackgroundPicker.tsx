'use client';

interface BackgroundPickerProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  backgroundColor,
  setBackgroundColor,
}) => {
  return (
    <div className="p-4 bg-gray-200 flex items-center space-x-4">
      <span>Background Color:</span>
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="w-8 h-8 p-0 border-none cursor-pointer"
      />
    </div>
  );
};

export default BackgroundPicker;
