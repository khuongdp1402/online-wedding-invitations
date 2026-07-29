"use client";

import React, { useEffect, useRef } from 'react';
import { ParticleEngine } from '@/lib/canvas/ParticleEngine';

export default function AntiGravityCanvas() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new ParticleEngine(canvasRef.current);
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50" 
      aria-hidden="true"
    />
  );
}
