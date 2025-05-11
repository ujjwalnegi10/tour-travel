
import img2 from '../assets/bg.jpg';
import img3 from '../assets/bg3.jpg';

export const ImageContainer2 = ({onClick}) => {
    return (
        <>
            <div
                className="w-[265px] h-[400px] flex flex-col cursor-pointer self-center mt-20 group"
                onClick={onClick} >
                <div className="w-[265px] h-[90%]  relative flex  ">
                    <div className="absolute w-[245px] flex flex-col h-[315px] left-5 shadow-xl/30 border-2 border-emerald-900  opacity-0 transition-transform rounded-tl-xl rounded-tr-xl rotate-5
                        duration-300 group-hover:scale-103 group-hover:translate-x-2.5 group-hover:-translate-y-11 group-hover:opacity-100">
                        {/* <img src={img3} className="w-full h-full rounded-xl" alt="img3" /> */}
                        <div className="absolute w-[80px] h-[80px] self-end -right-8 -top-8 bg-[url('./assets/off.png')] bg-center bg-cover m-1 rounded-full"></div>

                    </div>

                    <div className="group absolute w-full h-9/10  rounded-2xl shadow-xl/30 overflow-hidden transition-transform duration-500 group-hover:-translate-x-2 group-hover:-rotate-2">
                        <img
                            src={img3}ss
                            alt="img3"
                            className="w-full h-full rounded-2xl object-cover transition-transform duration-800 group-hover:scale-110"
                        />
                    </div>

                </div>
                <div className="h-[5%] text-xl italic w-1/2 self-center ml-2">
                    <span className="h-full px-4 relative">
                        <span className="relative z-10 group-hover:text-2xl text-cyan-900 text-shadow-lg text-shadow-blue">
                            kotdwar
                        </span>
                    </span>
                </div>
            </div></>
    )
}