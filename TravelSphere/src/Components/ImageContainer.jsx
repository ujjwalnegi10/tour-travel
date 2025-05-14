

export const ImageContainer = ({ onClick, img1, img2 ,title}) => {
    return (
        <div 
            className="lg:w-[400px] w-[100px] h-[130px] lg:h-[400px] parent group flex flex-col cursor-pointer justify-self-center" 
            onClick={onClick} 
        >
            <div className="w-full h-[90%] relative flex justify-center items-center">
                <div className="absolute lg:w-2/3 w-4/5 h-9/10 border-1 lg:border-2 border-emerald-900 lg:shadow-xl/80 shadow-xl/30  
                    transition-transform rounded-2xl duration-300 group-hover:scale-103 group-hover:-translate-x-4 group-hover:-translate-y-3 lg:group-hover:-translate-x-18 lg:group-hover:-translate-y-5">
                    <img src={img1} className="w-full h-full rounded-2xl" alt="img1" />
                </div>
                <div className="absolute lg:w-2/3 w-4/5 h-9/10 rounded-2xl transition-all duration-500 lg:group-hover:translate-x-18 
                    group-hover:translate-x-4 group-hover:translate-y-3 overflow-hidden lg:group-hover:translate-y-10">
                    <img src={img2} className="w-full h-full rounded-xl object-cover transition-transform duration-800 group-hover:scale-120" alt="img2" />
                </div>
            </div>
            <div className="flex-1 text-xl italic w-1/2 self-center flex justify-center group-hover:translate-y-1 lg:group-hover:translate-y-4">
                <span className="h-1/2 flex relative self-center">
                    <span className="absolute inset-0 w-[55px] lg:w-[250px] text-[10px] lg:text-lg h-full child flex">
                        <span className="self-center w-full h-full ml-[25%] text-rose-900 mb-1">{title}</span>
                    </span>
                    <span className="relative z-10 mb-2 h-[20px] text-[10px] lg:text-xl lg:w-full w-full group-hover:opacity-1 text-cyan-900 text-shadow-lg text-shadow-blue">
                        {title}
                    </span>
                </span>
            </div>
        </div>
    );
};

