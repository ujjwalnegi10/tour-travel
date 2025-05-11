import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export const PageTorn = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartAnim(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-[200px] lg:w-[450px] h-[80px] lg:h-[120px] flex bg-transparent border-hidden">
      <div
        className={`border-hidden h-full w-full relative flex justify-center pt-2 items-center ${
          startAnim ? 'box' : ''
        }`}
      >
        <div
          className={`flex w-full justify-center items-center bg-[#a2f4fd] absolute   italic h-full`}
        >
          <span className={`${startAnim ? 'animate-bounce' : ''} w-4/5 `}>
            <span className='text-lg lg:text-5xl pl-1.5 lg:pl-0 pr-1 lg:pr-2 text-[#FFFFFF] text-shadow-md text-shadow-[#5c4332]'>Journey</span><span className='text-lg lg:text-4xl text-[#ffffff] text-shadow-lg text-shadow-[#5c4332]'>Begins</span>
          </span>
        </div>

        <div className="absolute bg-[url('./assets/paper.png')] z-2 w-full h-full bg-cover border-hidden  bg-center mix-blend-lighten brightness-100"></div>
      </div>
    </div>
  );
};
