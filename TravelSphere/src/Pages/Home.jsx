
import { useState, useRef, useEffect } from "react";
import { ImageContainer } from "../Components/ImageContainer";
import { PageTorn } from "../Components/PageTorn";
import { Timer } from "../Components/Timer"
import { Container } from "../Components/Container";
import { ImageContainer2 } from "../Components/ImageContainer2";
import { SearchBar } from "../Components/SearchBar";
import { useInView } from 'react-intersection-observer';
import React from 'react';
import bookingImg from '../assets/booking-logo.png'
import taj from '../assets/taj-.png'
import trip from '../assets/tripadvisor-logo.png'
import viator from '../assets/viator.png'
import leela from '../assets/leela.png'
import airbnb from '../assets/airbnb-logo.png'
import { ScrollableSection } from "../Components/ScrollableSection";
import { Footer } from "../Components/Footer";
import { Carousel } from "../Components/Carousel";
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState(null); // To hold clicked image info

  const [showContainer, setShowContainer] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("Recommended");
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/destination')
  }
  const { ref: refAbout, inView: inViewAbout } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: refShapes, inView: inViewShapes } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });
  const items2 = [
    {
      name: "Booking.com",
      image: bookingImg, // Place this in your public/images folder
    },
    {
      name: "Taj",
      image: taj,
    },

    {
      name: "TripAdvisor",
      image: trip,
    },
    {
      name: "Viator",
      image: viator,
    },
    {
      name: "Leela Palace",
      image: leela,
    },
    {
      name: "Airbnb",
      image: airbnb
    }



  ];
  ;


  const [pdata, setdata] = useState([]);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Filter products to show only the "Recommended" category
  const product = pdata.filter((product) => product.category === "Recommended");

  const scroll = (direction) => {
    if (scrollRef.current && buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth + 130;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -buttonWidth : buttonWidth,
        behavior: "smooth",
      });
    }
  };


  const handleMouseEnter = () => setHovered(true);


  const renderCardItem2 = (item, index) => (
    <div className="bg-gradient-to-b from-white to-cyan-500 shadow-[0_10px_10px_-8px_rgba(0,0,0,1)] text-center 
           rounded-xl h-[80%] flex w-[250px] flex-shrink-0 text-3xl hover:scale-115">
      <div className="w-full flex flex-col space-y-5 relative h-full">
        <div className="w-[120px] h-[120px]  rounded-full self-center"><img src={item.image} /></div>
        <div className="w-full h-25 overflow-hidden text-white pt-2 text-shadow-lg merienda">{item.name}</div>
      </div>
    </div>
  );

  return (
    <>

      <div className="w-screen h-full  flex flex-col  justify-center items-center overflow-x-hidden">
        <div className="w-full h-screen  relative">
          <div className="w-full h-[90vh] z-20 absolute inset-0 flex mt-1 justify-center">
            <div className="w-[100%]  h-[100%]  bg-white"><Carousel /></div><div className="z-100 w-full flex justify-center mt-30 absolute">
              <div className=" text-center lg:py-12 px-4 w-9/10 lg:w-2/3 mt-20 md:mt-2 self-center">
                <h1 className="text-xl lg:text-6xl font-bold text-gray-800 mb-4 w-full">
                  Welcome to  <span className="text-emerald-900 merienda text-2xl lg:text-8xl mt-2">Travel</span>
                  <span className="text-rose-800 philosopher-regular-italic text-2xl lg:text-8xl">Sphere</span>
                </h1>
                <p className=" text-lg lg:text-2xl text-white max-w-2xl mx-auto">
                  Discover unforgettable destinations, exciting activities, and curated travel experiences just for you.
                </p>
              </div></div>
          </div>
        </div>




        {/* //about */}
        <div className="w-full flex pt-5 p-2 lg:p-15 justify-center h-fit ">
          <div
            className="w-full h-70 lg:h-[90vh] flex bg-[#fffbe8] shadow-xl/50 border-2 border-yellow-300 group"
            onMouseEnter={handleMouseEnter}

          >
            <div ref={refAbout} className="w-full h-full grid grid-cols-2 overflow-hidden">
              {/* Column 1 */}
              <div className="w-full h-full relative flex">
                <div

                  className={`absolute w-[50%] lg:w-[40%] h-[50%] lg:h-[70%] bg-[url('./assets/mountain.jpg')] shadow-xl/100 -rotate-5 bg-cover z-2 bg-center rounded-xl left-4 top-8 border-2 border-emerald-900 border-solid
          ${inViewAbout ? "fade-in-left" : "opacity-0"}`}

                ></div>

                <div
                  className={`absolute  w-[45%] lg:w-[30%]  h-[50%] lg:h-[50%] bg-[url('./assets/tour1.jpg')] rotate-8 bg-cover bg-center rounded-xl lg:left-35 left-12 top-10 lg:top-15 border-2 border-emerald-900 border-solid 
          ${inViewAbout ? "fade-in-left2" : "opacity-0"}`}

                ></div>
              </div>

              {/* Column 2 */}
              <div className="w-full h-full relative">
                <div
                  className={`absolute w-[30%] h-[70%]  lg:w-[20%] lg:h-[90%] bg-[url('./assets/indiagate1.jpg')] shadow-xl/80  bg-cover bg-center rotate-5 lg:left-[55%] left-[55%] top-7 lg:top-20 z-2 rounded-xl border-solid border-2 border-white
          ${inViewAbout ? "fade-in-right2" : "opacity-0"}`}

                ></div>

                <div className="flex flex-col absolute -left-[40%] top-2 gap-2">
                  <span className="flex text-2xl lg:text-8xl pl-10 lg:pl-0">
                    <span className="text-emerald-900 merienda mt-2">About</span>
                    <span className="text-rose-800 philosopher-regular-italic lg-mt-0 mt-2">Us</span>
                  </span>
                  <span className="text-center italic text-[8px] lg:text-xl lg:p-0 pl-5 w-[60%] lg:w-[60%]">
                    "Where every journey becomes an unforgettable story."
                  </span>
                  <span className=" italic text-[5px] w-[60%] pl-8 lg:p-0 lg:w-[60%] mt-2 lg:text-lg " >
                    At Travelsphere, we craft personalized travel experiences that go beyond the ordinary. From relaxing escapes to cultural adventures, we handle every detail for a smooth and memorable journey. Let us turn your travel dreams into lasting stories.
                  </span>
                  <span className=" italic  text-[6px] lg:text-lg w-[60%]">
                    Book your tour now and start your unforgettable journey today! Adventure is just a click away.
                  </span>
                  <button className=" mt-1 lg:mt-4 w-[50px] lg:w-[120px] text-[8px] lg:text-lg  italic bg-cyan-500  text-white px-1 lg:px-2 py-2 z-50 rounded hover:bg-cyan-800 transition-colors cursor-pointer shadow-xl/40" onClick={handleClick}>
                    Book Now
                  </button>

                </div>

                <div

                  className={`absolute w-[30%] h-[70%] lg:w-[20%] lg:h-[90%] bg-[url('./assets/beach2.jpg')] shadow-xl/40 rotate-3 bg-cover bg-center rounded-xl border-2 border-white left-[70%] top-2
        
         ${inViewAbout ? "fade-in-right" : "opacity-0"}`}
                ></div>
              </div>

              {/* Column 3 */}
              <div className="w-full h-full relative">
                <div

                  className={`absolute w-[50%] lg:w-[20%] h-[85%] lg:h-[80%] bg-[url('./assets/download.jpg')] bg-cover bg-center -left-5 border-2 border-white shadow-xl/30 top-5 rounded-xl
        
          ${inViewAbout ? "fade-in-left" : "opacity-0"}`}
                ></div>

                <div
                  className={`absolute w-[35%] h-[70%] lg:w-[20%] lg:h-[70%] bg-[url('./assets/waterfall1.jpg')] bg-center bg-cover lg:left-10 lg:top-15 top-10 left-6 shadow-xl/30 border-double rounded-xl border-white border-6
          ${inViewAbout ? "fade-in-left2" : "opacity-0"}`}

                ></div>

                <div className="absolute top-[60%] right-2 w-[45%] lg:w-[70%] text-[7px] lg:text-4xl text-center great-vibes-regular">
                  "Let your heart roam free and your feet follow. Travelsphere where journeys become stories."
                </div>
              </div>

              {/* Column 4 */}
              <div className="w-full h-full relative">
                <div
                  className={`absolute w-25 h-25 lg:w-64 lg:h-64 bg-[url('./assets/landing1.jpg')] bg-center bg-cover rounded-full border-2 border-rose-900  -right-7 top-[35%] lg:-right-16 lg:top-[30%]
          ${inViewAbout ? "fade-in-right" : "opacity-0"}`}

                ></div>

                <div
                  className={`absolute w-[45%] h-[60%] -bottom-10  bg-[url('./assets/taj.jpg')] bg-center rounded-sm bg-cover left-1 lg:left-8 -rotate-4 border-solid border-2 border-emerald-900
          ${inViewAbout ? "fade-in-bottom" : "opacity-0"}`}

                ></div>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full h-full bg-cyan-200 flex justify-center">       <div className="w-[90%] lg:w-[93%] h-full flex flex-col pb-5 pt-1 lg:pt-5 bg-white rounded-xl mt-15 mb-10 shadow-xl/70">
          <div className="self-center mb-2 lg:mb-10">
            <PageTorn />
          </div>














          {/* Grid Layout */}
          <div className="grid grid-cols-3 lg:gap-4 gap-2 lg:px-0 px-4  mb-2 lg:mb-10 relative">
            {product.map((image, index) => (
              <React.Fragment key={image.id}>

                {/* Conditionally render the full-page Container above the clicked card */}
                {showContainer && selectedImage?.id === image.id
                  && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                      <div
                        className="bg-white w-full h-full"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Container
                          onClose={() => setShowContainer(false)} // Close the container
                          product={selectedImage} // Pass the product data here
                        />
                      </div>
                    </div>
                  )}


                <ImageContainer
                  onClick={() => {
                    setSelectedImage(image);   // Store clicked image data
                    setShowContainer(true);    // Show container

                  }}
                  description={image.description}
                />
              </React.Fragment>
            ))}
          </div>


          <button className="self-end lg:mt-4 mt-1 mr-5 lg:mr-15 italic bg-emerald-700 mb-2 text-white lg:px-6 px-2 py-1 lg:py-2 text-sm lg:text-lg rounded hover:bg-cyan-600 transition-colors cursor-pointer" onClick={handleClick}>
            More...
          </button>

        </div></div>

        <div className='w-full bg-lime-300 mt-10 mb-10'>
          <Timer
            labelFontSize={14}
            backgroundColor="#2d3748"
            digitColor="white"
            dividerColor="yellow"
            text="Hurry! Limited offer ends soon!"
            direction="row"
          />
        </div>


        <div className="w-full h-fit lg:h-[550px] flex" onMouseEnter={() => setHovered2(true)}>
          <div className="w-1/2 bg-gradient-to-r from-amber-50 to-white lg:bg-gradient-to-r from-amber-200 to-white   pl-2 lg:pl-20 pt-2  lg:pt-15 text-center h-full flex flex-col">

            <span className="flex lg:text-7xl text-xl lg:py-8 py-1">
              <span className="text-emerald-900 philosopher-regular-italic mr-1 lg:mr-5">Why Travel</span>
              <span className="text-rose-800 philosopher-regular-italic">With Us</span>
            </span>
            <span className=" italic text-md lg:text-4xl w-[90%] ">
              Your Journey, Our Passion
            </span><br></br>
            <span className=" italic text-[9px] lg:text-lg w-[90%] text-left">At <span className="text-red-500">TravelSphere</span>, we craft more than just trips—we create unforgettable experiences.
              Our deep-rooted expertise and global partnerships ensure each journey is seamless, personalized, and enriching</span>
            <span className=" italic text-[9px] lg:text-lg w-[90%] text-left mt-5 mb-6">Trusted by Travelers Worldwide<br></br>

              With a legacy of excellence, we've earned the trust of countless adventurers. Our commitment to quality, safety, and authentic experiences sets us apart in the world of travel.

            </span>
          </div>
          <div ref={refShapes} className="w-1/2 flex justify-center items-center h-full lg:h-full self-center lg:pb-10 ">
            <div className="self-center lg:w-[250px] lg:h-[260px] w-[150px] h-[160px]  relative">
              <div className={`w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] bg-red-500 absolute transition-all lg:shadow-xl/80 shadow-xl/30 duration-[1000ms] delay-500 ease-out rounded-xl 
            ${inViewShapes ? "opacity-100 translate-x-0 translate-y-0 rotate-0 lg:-top-5 lg:-left-25 -left-10 -top-5 z-2" : "opacity-0 -translate-x-10 -translate-y-10 rotate-[180deg]"}`}></div>

              <div className={`w-[80px] h-[80px] lg:w-[160px] lg:h-[160px] bg-red-500 absolute transition-all lg:shadow-xl/80 shadow-xl/30 duration-[1200ms] delay-500 ease-out rounded-xl 
            ${inViewShapes ? "opacity-100 translate-y-0 rotate-0 -top-10 lg:-top-15 lg:left-10 left-7 z-2" : "opacity-0 translate-y-10 rotate-[-180deg]"}`}></div>

              <div className={`lg:w-[90px] w-[50px] h-[50px] lg:h-[90px] bg-red-500 absolute transition-all lg:shadow-xl/80 shadow-xl/30 duration-[900ms] delay-500 ease-out rounded-xl 
            ${inViewShapes ? "opacity-100 translate-x-0 rotate-0 lg:-right-15 lg:bottom-40 -right-4 bottom-30 z-2" : "opacity-0 translate-x-10 rotate-[360deg]"}`}></div>

              <div className={`lg:w-[260px] lg:h-[260px] w-[110px] h-[110px] bg-red-500 absolute transition-all lg:shadow-xl/80 shadow-xl/30 duration-[1100ms] delay-500 ease-out rounded-xl 
            ${inViewShapes ? "opacity-100 translate-y-0 rotate-0 lg:-left-40 -left-10 lg:-bottom-30 -bottom-0 z-2" : "opacity-0 -translate-y-10 rotate-[-90deg]"}`}></div>

              <div className={`lg:w-[220px] w-[80px] h-[80px] lg:h-[220px] bg-red-500 absolute transition-all lg:shadow-xl/80 shadow-xl/30 duration-[950ms] delay-500 ease-out rounded-xl 
            ${inViewShapes ? "opacity-100 translate-x-0 translate-y-0 rotate-0 lg:-right-25 -right-4 lg:-bottom-20 bottom-7 z-2" : "opacity-0 translate-x-10 translate-y-10 rotate-[270deg]"}`}></div>

              <div className={`lg:w-[350px] lg:h-[300px] w-[150px] h-[150px] bg-yellow-500 absolute rounded-xl shadow-xl/80 z-3 transition-all duration-200 delay-100 ease-out
            ${inViewShapes ? "opacity-0" : "opacity-100"}`}></div>
            </div>
          </div>
        </div>





        <div className="w-full h-fit flex flex-col ">

          <div className="self-center w-1/2 text-center h-[200px] justify-center  flex flex-col space-y-8"><span className="text-xl lg:text-7xl 
            merienda text-cyan-700 ">Our Partner's</span>
            <span className="lg:text-lg text[5px]">We collaborate with leading travel companies to bring you unique, customized experiences.
              Together, we provide seamless journeys and unforgettable adventures.</span></div>



          <ScrollableSection
            items={items2}
            renderItem={renderCardItem2}
            itemwidth={80}
            itemheight={400}
            space={128}
            value={130}
          />




        </div>


        <div className="w-full h-[580px] flex flex-col bg-red-50 justify-center items-center mb-20 pb-10 rounded-xl">
          <div className="self-center w-4/5 lg:w-1/2 text-center h-[200px] justify-center  flex flex-col space-y-8"><span className="text-7xl 
            merienda text-cyan-700 ">Our Experts</span>
            <span className="text-lg w-full">We collaborate with leading travel companies to bring you unique, customized experiences.
              Together, we provide seamless journeys and unforgettable adventures.</span></div>


          <div className="w-full h-full flex gap-20 justify-center items-center"> <div className="relative w-[20%] h-[80%]  overflow-hidden group bg-yellow-100 
 transition-colors  rounded-xl duration-300 shadow-xl/70 ">
            {/* Overlay that animates on hover */}
            <div className="absolute inset-0 bg-cyan-200 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100 z-0"></div>

            {/* Content goes on top */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-bold text-xl">
              <div className="w-38 h-38 mb-8 rounded-full overflow-hidden border-1 border-black group-hover:border-white mb-4">
                <img
                  src="https://via.placeholder.com/150"

                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-black group-hover:text-sky-900">
                <h2 className="text-3xl font-semibold mb-2">Bill Gates</h2>
                <p className="text-base font-normal">Co-founder of Microsoft</p>
                <p className="text-base font-normal">Philanthropist & Innovator</p>
              </div>
            </div>

          </div>
            <div className="relative w-[20%] h-[80%] rounded-xl overflow-hidden group bg-yellow-100  transition-colors duration-300 shadow-xl/70 ">
              {/* Overlay that animates on hover */}
              <div className="absolute inset-0 bg-cyan-200 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100 z-0"></div>

              {/* Content goes on top */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-bold text-xl">
                <div className="w-38 h-38 mb-8 rounded-full overflow-hidden border-1 border-black group-hover:border-white mb-4">
                  <img
                    src="https://via.placeholder.com/150"

                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center text-black group-hover:text-sky-900">
                  <h2 className="text-3xl font-semibold mb-2">Bill Gates</h2>
                  <p className="text-base font-normal">Co-founder of Microsoft</p>
                  <p className="text-base font-normal">Philanthropist & Innovator</p>
                </div>
              </div>
            </div>
            <div className="relative w-[20%] h-[80%] rounded-xl overflow-hidden group bg-yellow-100   transition-colors duration-300 shadow-xl/70 ">
              {/* Overlay that animates on hover */}
              <div className="absolute inset-0 bg-cyan-200 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100 z-0"></div>

              {/* Content goes on top */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-bold text-xl">
                <div className="w-38 h-38 mb-8 rounded-full overflow-hidden border-1 border-black group-hover:border-white mb-4">
                  <img
                    src="https://via.placeholder.com/150"

                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center text-black group-hover:text-sky-900">
                  <h2 className="text-3xl font-semibold mb-2">Bill Gates</h2>
                  <p className="text-base font-normal">Co-founder of Microsoft</p>
                  <p className="text-base font-normal">Philanthropist & Innovator</p>
                </div>
              </div>
            </div></div>





        </div>


        <Footer />


      </div>

    </>
  );
};
