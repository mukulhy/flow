'use client';

interface ToolbarProps {
  tool: string;
  setTool: (tool: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ tool, setTool }) => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-200">
      <button onClick={() => setTool('pointer')}>Pointer</button>
      <button onClick={() => setTool('pencil')}>Pencil</button>
      <button onClick={() => setTool('eraser')}>Eraser</button>
      <button onClick={() => setTool('rectangle')}>Rectangle</button>
      <button onClick={() => setTool('circle')}>Circle</button>
      <button onClick={() => setTool('text')}>Text</button>
      <button onClick={() => setTool('image')}>Image</button>
    </div>
  );
};

export default Toolbar;
