import { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SearchBar } from "../Components/SearchBar";
import { ImageContainer2 } from "../Components/ImageContainer2";
import { ScrollableSection } from "../Components/ScrollableSection"; // Import the new ScrollableSection component
import { Timer } from "../Components/Timer"
import bookingImg from '../assets/booking-logo.png'
import taj from '../assets/taj-.png'
import trip from '../assets/tripadvisor-logo.png'
import viator from '../assets/viator.png'
import leela from '../assets/leela.png'
import airbnb from '../assets/airbnb-logo.png'
import React from 'react';
import { Container } from "../Components/Container";
import { Carousel } from '../Components/Carousel';
import { Footer } from '../Components/Footer';
const reviews = [
  {
    image: "/images/review1.jpg",
    title: "Zachary's Honeymoon in Paris",
    content: "From temples to beaches, and from nature to adventure, Zachary and his wife wanted to experience the best of an exotic destination...",
    rating: 4.7,
    bgColor: "bg-pink-200",
  },
  {
    image: "/images/review2.jpg",
    title: "Anna's Vacation in Bali",
    content: "Sunsets, surf, and serenity defined Anna's unforgettable journey through Bali. A perfect blend of relaxation and exploration...",
    rating: 4.9,
    bgColor: "bg-green-200",
  },
  {
    image: "/images/review3.jpg",
    title: "Liam’s Safari Adventure",
    content: "Wildlife, adventure, and untamed beauty. Liam's safari in Kenya was a dream come true...",
    rating: 4.8,
    bgColor: "bg-yellow-200",
  },
];

export const DestinationSelector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showContainer, setShowContainer] = useState(false);

  const [pdata, setdata] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  // Filter products based on selected category


















  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("Recommended");

  const items = [
    "Recommended", "Mountains", "Temples", "Monuments", "Beaches"
  ];

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
  const product = pdata.filter((product) => product.category === selected);
  const handleSelect = (item) => {
    setSelected(item);
    console.log("Selected:", item);
  };

  const goUp = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goDown = () => {
    if (index < reviews.length - 1) setIndex(index + 1);
  };

  const renderNavItem = (item, index) => (
    <button
      key={index}
      onClick={() => handleSelect(item)}
      className={`px-4 py-2 rounded-full border ${selected === item ? "bg-blue-600 text-white" : "bg-white text-gray-700"} shadow whitespace-nowrap`}
    >
      {item}
    </button>

  );

  const renderCardItem = (items2, index) => (
    <div className="bg-cyan-50 shadow-[0_10px_10px_-8px_rgba(0,0,0,1)] text-center 
           rounded-xl h-full flex w-[250px] flex-shrink-0 text-3xl border hover:scale-115">
      <div className="w-full flex flex-col space-y-5 relative ">
        <div className="w-[120px] h-[120px]   rounded-full self-center"><img src={items2.image} /></div>
        <div className="w-full h-10 overflow-hidden text-white mt-4 text-shadow-lg merienda">{items2.name}</div>
      </div>
    </div>
  );

  const currentReview = reviews[index];

  return (
    <div className="relative w-screen flex justify-center flex-col space-y-20">
      {/* Search Bar Section */}
      <div className="w-full h-[120vh] relative bg-[url('./assets/bgs1.png')] bg-cover bg-bottom ">
        <div className="w-full h-[75%]  z-20 absolute  inset-0 flex justify-center ">
          <div className="w-[100%] h-[100%] rounded-2xl flex justify-center items-center shadow-xl/30">
          <div className='w-full h-full rounded-2xl '><Carousel setcorner={50}/></div>
          <div className="self-center absolute mb-40">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
 
      {/* Navigation Section */}
      <ScrollableSection
        items={items}
        renderItem={renderNavItem}
        itemwidth={60}
        itemheight={55}
        space={100}
        value={130}
      />



      <div className="bg-yellow-50 grid grid-cols-4 place-items-center self-center w-[90%] rounded-xl shadow-xl/30 h-fit pl-5 pr-5">
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
                     onClose={() => setShowContainer(false)}
                     productId={selectedImage.id}
                   />
                  </div>
                </div>
              )}


            <ImageContainer2
              onClick={() => {
                setSelectedImage(image);   // Store clicked image data
                setShowContainer(true);    // Show container

              }}
              img1={image.img1}
        img2={image.img2}
        title={image.title}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Review Details */}
      <div className="flex self-center w-[90%] h-[500px] space-x-2 rounded-xl bg-rose-50 group">
        <div className="w-1/3 rounded-xl bg-gradient-to-r from-cyan-300 to-rose-50 flex items-center p-5 flex-col space-y-10">
          <div className="text-center border-b-3 border-t-3 border-l-3 pt-2 pb-2 mt-20 text-xl rounded-xl pl-2 text-red-700 shadow-xl/30">
            #Travel<span className="text-emerald-900 border-green border-b-3 border-t-3 border-r-3 py-2 pr-2 w-full h-full rounded-tr-xl rounded-br-xl z-2">stories</span>
          </div>
          <div className="w-full text-4xl text-center space-y-2 flex flex-col text-cyan-900">
            <span>Over 6K+ <br /> Happy Travelers</span>
            <span className="text-sm p-2 text-center">"Trusted by thousands worldwide, our travelers’ smiles say it all. Be part of the journey today!"</span>
          </div>
          <button className="italic bg-cyan-500 mb-2 text-white px-6 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer shadow-xl/40">Book Now</button>
        </div>

        <div className={`flex-1 h-[65%] self-center shadow-2xl ${currentReview.bgColor} rounded-xl m-8 group-hover:scale-105`}>
          <div className="flex items-center h-full space-around p-4">
            <div className="w-2/5 h-full flex items-center space-y-2">
              <img src={currentReview.image} alt={currentReview.title} className="w-full h-[90%] object-cover rounded-lg" />
            </div>
            <div className="flex flex-col w-1/2 h-[80%] ml-5">
              <div className="text-yellow-500 text-2xl h-10 font-semibold">{currentReview.rating} ★</div>
              <h2 className="text-xl font-bold mt-5 mb-5">{currentReview.title}</h2>
              <p className="text-gray-600 h-20">{currentReview.content}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={goUp} disabled={index === 0} className="p-2 bg-cyan-200 rounded-full hover:bg-cyan-600 hover:text-white disabled:opacity-50">
                <ArrowUp />
              </button>
              <button onClick={goDown} disabled={index === reviews.length - 1} className="p-2 bg-cyan-200 rounded-full hover:bg-cyan-600 hover:text-white disabled:opacity-50">
                <ArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Section */}
      <div className="w-full h-[500px] bg-cover flex px-20 justify-center bg-center">
        <div className='w-2/3 h-full bg-yellow-50 flex justify-center rounded-xl p-10'> <ScrollableSection
          items={items2}
          renderItem={renderCardItem}
          itemwidth={90}
          itemheight={400}
          space={80}
          value={80}
        /></div>
        <div className="w-1/3 h-full flex flex-col bg-gradient-to-l from-green-300 to-yellow-50 pt-10 rounded-xl space-y-8 ">

          <div className="text-6xl merienda  flex  text-red-700 w-full text-center">Special Offer's</div>
          <span><span className='text-lg italic  pl-15'>Limited-Time Travel Deals Just for You!<br></br>
            Hurry — these exclusive tour packages won’t last long.
            <span><span className='flex flex-col text-4xl mt-10 text-red-900 merienda text-center'><span>Offer ends in:</span>
              <Timer

                fontSize={24}
                width={30}
                height={29}
                bgColor="transparent"
                labelFontSize={14}
                backgroundColor="#2d3748"
                digitColor="white"
                dividerColor="yellow"
                text=""
                direction="col"
              ></Timer></span></span></span>

          </span>
        </div>


      </div>
     <Footer></Footer>
    </div>
  );
};
