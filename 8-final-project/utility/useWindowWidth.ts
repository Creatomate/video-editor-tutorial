import { useEffect, useState } from 'react';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>();
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}
