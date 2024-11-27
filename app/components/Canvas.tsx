'use client';

import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text, Image } from 'react-konva';

interface CanvasProps {
  tool: string;
  backgroundColor: string;
  zoomLevel: number;
  strokeColor: string;
  strokeWidth: number;
}

const Canvas: React.FC<CanvasProps> = ({
  tool,
  backgroundColor,
  zoomLevel,
  strokeColor,
  strokeWidth,
}) => {
  const [elements, setElements] = useState<any[]>([]); // Store shapes, lines, etc.
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<any>(null); // Track the current drawing shape
  const stageRef = useRef<any>(null);

  const handleMouseDown = (e: any) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (tool === 'pencil') {
      const newLine = {
        type: 'line',
        points: [pointerPosition.x, pointerPosition.y],
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
      };
      setElements([...elements, newLine]);
      setCurrentElement(newLine);
      setIsDrawing(true);
    } else if (tool === 'rectangle') {
      const newRect = {
        type: 'rect',
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 0,
        height: 0,
        fill: strokeColor,
      };
      setElements([...elements, newRect]);
      setCurrentElement(newRect);
    }
    // Add other tools like circle, text, etc.
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !currentElement) return;

    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (tool === 'pencil') {
      const updatedLine = {
        ...currentElement,
        points: [...currentElement.points, pointerPosition.x, pointerPosition.y],
      };
      const updatedElements = elements.slice(0, -1).concat(updatedLine);
      setElements(updatedElements);
      setCurrentElement(updatedLine);
    } else if (tool === 'rectangle') {
      const updatedRect = {
        ...currentElement,
        width: pointerPosition.x - currentElement.x,
        height: pointerPosition.y - currentElement.y,
      };
      const updatedElements = elements.slice(0, -1).concat(updatedRect);
      setElements(updatedElements);
      setCurrentElement(updatedRect);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setCurrentElement(null);
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        scaleX={zoomLevel}
        scaleY={zoomLevel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth * 2}
            height={window.innerHeight * 2}
            fill={backgroundColor}
          />
          {elements.map((el, index) => {
            if (el.type === 'line') {
              return <Line key={index} {...el} />;
            } else if (el.type === 'rect') {
              return <Rect key={index} {...el} />;
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
