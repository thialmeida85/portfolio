import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    // Smooth scroll CSS - simpler alternative to Lenis library
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      @supports (scroll-behavior: smooth) {
        html {
          scroll-behavior: smooth;
        }
      }
      
      /* Smooth scroll for internal links */
      a[href^="#"] {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
}
