import React, { useState, useEffect } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

export function Timer(props) {
  const {
    fontSize = 18,
    width = 22,
    height = 26,
    labelFontSize = 12,
    labelColor = '#004f3b',
    backgroundColor = '#1f2937',
    digitColor = '#e8fffe',
    dividerColor = 'lime',
    bgColor = '#bef264',
    text = "Hurry! Limited offer ends soon!",
    to,
    direction = 'row',
  } = props;

  const defaultCountdown = new Date().getTime() + 50 * 3600 * 1000; // 50 hours

  // Handle screen size for responsive styles
  const [screenSize, setScreenSize] = useState('md');

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Dynamically adjust digit sizes based on screen
  const getSize = () => {
    switch (screenSize) {
      case 'sm':
        return { width: 20, height: 26, fontSize: 16 };
      case 'md':
        return { width: 24, height: 30, fontSize: 20 };
      case 'lg':
        return { width: 30, height: 36, fontSize: 24 };
      default:
        return { width: 34, height: 42, fontSize: 28 };
    }
  };

  const { width: digitWidth, height: digitHeight, fontSize: digitFontSize } = getSize();

  return (
    <div
      className={`flex flex-wrap ${direction === 'col' ? 'flex-col' : 'flex-row'} 
      gap-4 sm:gap-6 md:gap-8 justify-center items-center p-4 rounded-lg`}
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-emerald-900 font-medium text-base sm:text-lg md:text-xl lg:text-2xl text-center">
        {text}
      </p>
      <FlipClockCountdown
        to={to || defaultCountdown}
        labels={['Days', 'Hours', 'Minutes', 'Seconds']}
        labelStyle={{
          fontSize: labelFontSize,
          color: labelColor,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        digitBlockStyle={{
          width: digitWidth,
          height: digitHeight,
          fontSize: digitFontSize,
          background: backgroundColor,
          color: digitColor,
          borderRadius: 8,
        }}
        dividerStyle={{ color: dividerColor }}
        duration={0.6}
      />
    </div>
  );
}

export default Timer;
