'use client';

import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Line, Circle, Text, Transformer } from 'react-konva';

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
  const [elements, setElements] = useState<any[]>([]); // Store all shapes, lines, etc.
  const [selectedId, setSelectedId] = useState<string | null>(null); // Track selected element ID
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  const handleMouseDown = (e: any) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (tool === 'pointer') {
      const clickedOn = e.target;
      if (clickedOn === stage) {
        // Deselect if clicked on empty space
        setSelectedId(null);
      } else {
        // Select the clicked element
        const id = clickedOn.id();
        setSelectedId(id);
      }
      return;
    }

    if (tool === 'pencil') {
      const newLine = {
        id: `${Date.now()}`, // Unique ID
        type: 'line',
        points: [pointerPosition.x, pointerPosition.y],
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
      };
      setElements([...elements, newLine]);
    } else if (tool === 'rectangle') {
      const newRect = {
        id: `${Date.now()}`, // Unique ID
        type: 'rect',
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 0,
        height: 0,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      };
      setElements([...elements, newRect]);
    } else if (tool === 'circle') {
      const newCircle = {
        id: `${Date.now()}`, // Unique ID
        type: 'circle',
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: 0,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      };
      setElements([...elements, newCircle]);
    }
  };

  const handleMouseMove = (e: any) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();
    if (tool === 'pencil') {
      const updatedElements = [...elements];
      const lastLine = updatedElements[updatedElements.length - 1];
      if (lastLine && lastLine.type === 'line') {
        lastLine.points = lastLine.points.concat([pointerPosition.x, pointerPosition.y]);
        setElements(updatedElements);
      }
    } else if (tool === 'rectangle') {
      const updatedElements = [...elements];
      const lastRect = updatedElements[updatedElements.length - 1];
      if (lastRect && lastRect.type === 'rect') {
        lastRect.width = pointerPosition.x - lastRect.x;
        lastRect.height = pointerPosition.y - lastRect.y;
        setElements(updatedElements);
      }
    } else if (tool === 'circle') {
      const updatedElements = [...elements];
      const lastCircle = updatedElements[updatedElements.length - 1];
      if (lastCircle && lastCircle.type === 'circle') {
        lastCircle.radius = Math.sqrt(
          Math.pow(pointerPosition.x - lastCircle.x, 2) +
            Math.pow(pointerPosition.y - lastCircle.y, 2)
        );
        setElements(updatedElements);
      }
    }
  };

  const handleMouseUp = () => {
    if (tool !== 'pointer') {
      return;
    }
  };

  const updateTransformer = () => {
    const transformer = transformerRef.current;
    if (transformer) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformer.nodes([selectedNode]);
        transformer.getLayer().batchDraw();
      } else {
        transformer.nodes([]);
      }
    }
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={tool === 'pointer'} // Only draggable in pointer mode
        scaleX={zoomLevel}
        scaleY={zoomLevel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {/* Background */}
          <Rect
            x={0}
            y={0}
            width={window.innerWidth * 2}
            height={window.innerHeight * 2}
            fill={backgroundColor}
          />
          {/* Render elements */}
          {elements.map((el, index) => {
            if (el.type === 'line') {
              return <Line key={el.id} id={el.id} {...el} />;
            } else if (el.type === 'rect') {
              return (
                <Rect
                  key={el.id}
                  id={el.id}
                  {...el}
                  draggable={tool === 'pointer'}
                  onClick={() => setSelectedId(el.id)}
                />
              );
            } else if (el.type === 'circle') {
              return (
                <Circle
                  key={el.id}
                  id={el.id}
                  {...el}
                  draggable={tool === 'pointer'}
                  onClick={() => setSelectedId(el.id)}
                />
              );
            } else if (el.type === 'text') {
              return (
                <Text
                  key={el.id}
                  id={el.id}
                  {...el}
                  draggable={tool === 'pointer'}
                  onClick={() => setSelectedId(el.id)}
                />
              );
            }
            return null;
          })}
          {/* Transformer for resizing and rotating */}
          <Transformer
            ref={transformerRef}
            keepRatio
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            onTransformEnd={updateTransformer}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
