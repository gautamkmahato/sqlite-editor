'use client'

import { useEffect, useState } from 'react';

const GeometricBackground = () => {
  const [triangles, setTriangles] = useState([]);

  useEffect(() => {
    // Generate triangle data
    const newTriangles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      rotation: Math.random() * 360
    }));
    setTriangles(newTriangles);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-white to-white overflow-hidden">
      {triangles.map((triangle) => (
        <div
          key={triangle.id}
          className="absolute w-0 h-0 animate-float"
          style={{
            left: `${triangle.left}%`,
            top: `${triangle.top}%`,
            borderLeft: `${triangle.size}px solid transparent`,
            borderRight: `${triangle.size}px solid transparent`,
            borderBottom: `${triangle.size * 1.732}px solid rgba(0, 0, 0, 0.1)`,
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))',
            animation: 'float 10s infinite linear',
            animationDelay: `${triangle.delay}s`,
            transform: `rotate(${triangle.rotation}deg)`
          }}
        />
      ))}
    </div>

  );
};

export default GeometricBackground;