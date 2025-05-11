import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: Install lucide-react for icons

import img2 from '../assets/bg.jpg';
import img3 from '../assets/bg3.jpg';
import { vw } from "framer-motion";

export const Carousel=({setcorner})=>{
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 10,
    },
  });

  const timer = useRef();
  const [paused, setPaused] = useState(false);

  // Autoplay logic
  useEffect(() => {
    if (!slider) return;

    timer.current = setInterval(() => {
      if (!paused) slider.current?.next();
    }, 2000); // Change slide every 3s

    return () => clearInterval(timer.current);
  }, [paused, slider]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-full "
      style={{
  
        borderRadius: `${setcorner}px`, // or any px/rem/% value
    
      }}
    >
      <div ref={sliderRef} className="keen-slider rounded overflow-hidden h-full ">
        <div className="keen-slider__slide bg-blue-200 text-center h-full text-xl font-semibold"><img src={img2}  className="w-full h-full"/></div>
        <div className="keen-slider__slide bg-green-200  text-center text-xl font-semibold"><img src={img3}  className="w-full h-full"/></div>
        <div className="keen-slider__slide bg-pink-200  text-center text-xl font-semibold"><img src={img2} className="w-full h-full"/></div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => slider.current?.prev()}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70  backdrop-blur-sm border-white/30 rounded-full shadow lg:p-2 p-1 lg:ml-5 hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="lg:w-7 w-4 lg:h-7 h-4" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => slider.current?.next()}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70  backdrop-blur-sm border-white/30 rounded-full shadow lg:p-2 p-1 lg:mr-5 hover:bg-gray-100 z-10"
      >
        <ChevronRight className="lg:w-7 w-4 lg:h-7 h-4 " />
      </button>
    </div>
  );
}
