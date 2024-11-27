'use client';

import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import ZoomControls from './components/ZoomControls';
import LeftToolbar from './components/LeftToolbar';

export default function Home() {
  const [tool, setTool] = useState<string>('pointer');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);

  return (
    <div className="w-screen h-screen relative">
      <Toolbar tool={tool} setTool={setTool} />
      <LeftToolbar
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
      />
      <ZoomControls zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      <Canvas
        tool={tool}
        backgroundColor={backgroundColor}
        zoomLevel={zoomLevel}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}
