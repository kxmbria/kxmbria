import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import pencilPink from "figma:asset/69e4f3b904ee413c77cb62d93906cbc09a4b74d6.png";

interface DrawingPath {
  id: number;
  points: { x: number; y: number }[];
  timestamp: number;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [drawingPaths, setDrawingPaths] = useState<DrawingPath[]>([]);
  const [trailPath, setTrailPath] = useState<{ x: number; y: number }[]>([]);
  const currentPath = useRef<{ x: number; y: number }[]>([]);
  const pathIdRef = useRef(0);
  const isDrawing = useRef(false);
  
  const pinkColor = "#FF1493";
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Direct cursor position (no lag)
  const cursorXDirect = useMotionValue(-100);
  const cursorYDirect = useMotionValue(-100);
  
  // Smooth spring animation for drawing trails only
  const springConfig = { damping: 30, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Offset to align drawing with pencil tip at bottom of image
    const tipOffsetX = 0;
    const tipOffsetY = 0;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXDirect.set(e.clientX);
      cursorYDirect.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // Update drawing paths based on spring-animated cursor position
    const unsubscribeX = cursorXSpring.on("change", (x) => {
      const y = cursorYSpring.get();
      
      // Always update trail path (faint doodle that follows cursor)
      setTrailPath(prev => {
        const newPath = [...prev, { x: x + tipOffsetX, y: y + tipOffsetY }];
        // Keep trail at a reasonable length (longer for more visible trail)
        if (newPath.length > 50) {
          newPath.shift();
        }
        return newPath;
      });

      // Add point to current drawing path
      if (isDrawing.current) {
        currentPath.current.push({ x: x + tipOffsetX, y: y + tipOffsetY });
        
        // Keep path length reasonable
        if (currentPath.current.length > 50) {
          currentPath.current.shift();
        }
      }
    });

    const handleMouseDown = () => {
      isDrawing.current = true;
      currentPath.current = [];
    };

    const handleMouseUp = () => {
      if (isDrawing.current && currentPath.current.length > 1) {
        // Save the completed path
        const newPath: DrawingPath = {
          id: pathIdRef.current++,
          points: [...currentPath.current],
          timestamp: Date.now()
        };
        
        setDrawingPaths(prev => [...prev, newPath]);
        
        // Remove path after 5.5 seconds
        setTimeout(() => {
          setDrawingPaths(prev => prev.filter(p => p.id !== newPath.id));
        }, 5500);
      }
      
      isDrawing.current = false;
      currentPath.current = [];
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      handleMouseUp();
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      cursorX.set(touch.clientX);
      cursorY.set(touch.clientY);
      cursorXDirect.set(touch.clientX);
      cursorYDirect.set(touch.clientY);
      setIsVisible(true);
      // Don't start drawing on touch to allow scrolling
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Don't prevent default - allow normal scrolling
      const touch = e.touches[0];
      cursorX.set(touch.clientX);
      cursorY.set(touch.clientY);
      cursorXDirect.set(touch.clientX);
      cursorYDirect.set(touch.clientY);
    };

    const handleTouchEnd = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Add touch event listeners
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      unsubscribeX();
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cursorX, cursorY, cursorXSpring, cursorYSpring, isVisible]);

  // Convert points to SVG path with smooth curves
  const pointsToPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    // Use quadratic curves for smooth drawing
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
    }
    
    // Add the last point
    if (points.length > 1) {
      const lastPoint = points[points.length - 1];
      path += ` L ${lastPoint.x} ${lastPoint.y}`;
    }
    
    return path;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Drawing trails */}
      <svg
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
        style={{ overflow: 'visible' }}
      >
        {/* Faint trail that always follows cursor */}
        {trailPath.length > 1 && (
          <path
            d={pointsToPath(trailPath)}
            stroke={pinkColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ 
              opacity: 0.2,
              filter: 'url(#pencil-texture)'
            }}
          />
        )}

        {/* Current path being drawn */}
        {isDrawing.current && currentPath.current.length > 1 && (
          <path
            d={pointsToPath(currentPath.current)}
            stroke={pinkColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ 
              opacity: 1,
              filter: 'url(#pencil-texture)'
            }}
          />
        )}
        
        {/* Completed paths that are fading */}
        {drawingPaths.map((path) => {
          const age = Date.now() - path.timestamp;
          const opacity = Math.max(0, 1 - age / 5500);
          
          return (
            <path
              key={path.id}
              d={pointsToPath(path.points)}
              stroke={pinkColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ 
                opacity,
                filter: 'url(#pencil-texture)',
                transition: 'opacity 0.3s ease-out'
              }}
            />
          );
        })}
        
        {/* Pencil texture filter for sketchy effect */}
        <defs>
          <filter id="pencil-texture">
            <feTurbulence baseFrequency="0.5" numOctaves="2" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
          </filter>
        </defs>
      </svg>

      {/* Main cursor - custom pencil */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXDirect,
          y: cursorYDirect,
        }}
      >
        <img
          src={pencilPink}
          alt=""
          style={{
            width: "32px",
            height: "auto",
            transform: "translate(-16px, -32px)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          }}
        />
      </motion.div>
    </>
  );
}