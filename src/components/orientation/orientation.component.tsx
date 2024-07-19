/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './orientation.style.css'

const OrientationHandler = ({ children }: any) => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const handleOrientationChange = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  if (!isPortrait) {
    return (
      <div className='landscapeMessage'>
        Por favor, gira tu dispositivo a modo vertical para usar esta aplicación.
      </div>
    );
  }

  return <>{children}</>;
};

export default OrientationHandler;
