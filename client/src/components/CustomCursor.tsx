import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('group');

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        body, button, a, [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-normal"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 8),
          y: mousePosition.y - (isHovering ? 20 : 8),
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute w-8 h-8 border-2 border-accent bg-accent/10 rounded-full shadow-[0_0_0_8px_rgba(201,168,76,0.08)]"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.95 : 0.7,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Inner dot */}
        <motion.div
          className="absolute w-2 h-2 bg-accent rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Glow effect on hover */}
        {isHovering && (
          <motion.div
            className="absolute w-12 h-12 bg-accent rounded-full blur-lg opacity-20 -top-2 -left-2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>
    </>
  );
}
