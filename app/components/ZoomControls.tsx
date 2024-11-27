'use client';

interface ZoomControlsProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomLevel, setZoomLevel }) => {
  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.1, 5)); // Limit zoom to 5x
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5)); // Minimum 0.5x
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="absolute bottom-4 left-4 bg-gray-200 p-2 flex space-x-2">
      <button onClick={handleZoomIn}>
        -
      </button>
      <span>{(zoomLevel * 100).toFixed(0)}%</span>
      <button onClick={handleZoomOut}>
        +
      </button>
    </div>
  );
};

export default ZoomControls;
