import React, { useRef } from 'react';

export const ScrollableSection = ({ items, renderItem ,itemwidth,itemheight,space ,value}) => {
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current && buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth + value;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -buttonWidth : buttonWidth,
        behavior: 'smooth',
      });
    }
  };
  console.log(itemheight)
  return (
    
    <div
    className="relative w-[90%] overflow-hidden flex justify-center self-center"
    style={{ height: `${itemheight}px` }}
  >
  
      <div
        ref={scrollRef}
        className={`flex items-center self-center  overflow-x-auto scrollbar-hide  h-[90%] px-13 `}  style={{
          width: `${itemwidth}%`,
          columnGap: `${space}px`, // ✅ inline column gap
        }}
      >
        {items.map((item, index) => (
          <div key={index} ref={index === 0 ? buttonRef : null} className='h-[80%]'>
            {renderItem(item, index)}
           
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute top-1/2 left-2 pb-2 transform -translate-y-1/2 bg-blue-400 w-12 h-12 flex items-center justify-center text-4xl text-white hover:bg-blue-600 hover:text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
      >
        ←
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute top-1/2 right-2 pb-2 transform -translate-y-1/2 bg-blue-400 w-12 h-12 flex items-center justify-center text-4xl text-white hover:text-white hover:bg-blue-600 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
      >
        →
      </button>
    </div>
  );
};


