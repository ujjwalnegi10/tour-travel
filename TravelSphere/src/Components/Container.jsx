import React, { useEffect, useState, useContext } from "react";
import CustomDatePicker from "./DatePicker"; // Import the CustomDatePicker component
import { addDays, eachDayOfInterval } from "date-fns"; // Utility to add days and get each day in a range
import Timer from "./Timer";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";


import { WishlistContext } from "../Context/WishlistContext.jsx";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";


export const Container = ({ onClose, product }) => {

  const activities = [
    "City Sightseeing",
    "Adventure Sports",
    "Local Food Tasting",
    "Cultural Experiences",
    "Beach Relaxation",
    "Hiking & Trekking",
    "Wildlife Safaris",
    "Historic Site Visits",
    "Boat Cruises",
    "Shopping in Local Markets"
  ];
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setWishlist(savedWishlist)
    setCart(savedCart)
  }, [])

  // Helper function to trigger localStorage change event
  const triggerStorageEvent = () => {
    window.dispatchEvent(new Event("localStorageChange"))
  }

  // Add to wishlist
  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    let updatedWishlist;
  
    if (isWishlisted) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
  
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    triggerStorageEvent();
  };
  

  // Add to cart
  const toggleCart = (product) => {
    const isInCartAlready = cart.some((item) => item.id === product.id);
    let updatedCart;
  
    if (isInCartAlready) {
      updatedCart = cart.filter((item) => item.id !== product.id);
    } else {
      updatedCart = [...cart, product];
    }
  
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    triggerStorageEvent();
  };
  
  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId)
  }



  const [offsetY, setOffsetY] = useState(0);



  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const predefinedComments = [
    "This place is amazing! Highly recommend.",
    "Very clean and the service was excellent."
  ];

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numDays, setNumDays] = useState(7);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [ratingCount, setRatingCount] = useState({
    excellent: 240,
    veryGood: 51,
    average: 13,
    poor: 1,
    terrible: 0,
  });
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleRating = (star) => {
    setNewRating(star);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([newComment, ...comments]);
      setNewComment("");

      setRatingCount((prev) => ({
        ...prev,
        excellent: prev.excellent + (newRating === 5 ? 1 : 0),
        veryGood: prev.veryGood + (newRating === 4 ? 1 : 0),
        average: prev.average + (newRating === 3 ? 1 : 0),
        poor: prev.poor + (newRating === 2 ? 1 : 0),
        terrible: prev.terrible + (newRating === 1 ? 1 : 0),
      }));
      setNewRating(0);
    }
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (date) {
      const newCheckOutDate = addDays(date, numDays);
      setCheckOutDate(newCheckOutDate);
    }
  };

  const getHighlightedDates = () => {
    if (checkInDate) {
      const rangeEnd = addDays(checkInDate, numDays);
      return eachDayOfInterval({
        start: checkInDate,
        end: rangeEnd,
      });
    }
    return [];
  }
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto pt-10 bg-gradient-to-t from-amber-100 to-purple-200">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex w-[90%] h-full gap-10 relative">
          <div className="flex-1 space-y-6">
            <div className="border w-full h-[400px]">
              <div className="h-full bg-gray-100 flex items-center justify-center w-full">image</div>
            </div>
            <div className=" w-full flex justify-between">   
              <div className="text-3xl pl-2">name of place</div>
              <button
  onClick={() => toggleWishlist(product)}
  className="p-2 rounded-full transition-colors duration-300 hover:scale-110"
>
  <Heart
    size={48}
    className={isInWishlist(product.id) ? "text-red-500" : "text-[#8c8485]"}
    fill={isInWishlist(product.id) ? "red" : "#8c8485"}
  />
</button>

            </div>
            <div className="p-4">
              <p className="text-gray-600">{product.description}</p>
            </div>
            {/* wishlist button */}


            <div className=" py-12 px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Things You Can Do on Our Tours
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto text-gray-700">
                {activities.map((item, index) => (
                  <li
                    key={index}
                    className="bg-sky-100 rounded-xl p-4 shadow hover:bg-sky-200 transition duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 w-full h-[400px] gap-1">
              <div className="grid grid-flow-col grid-rows-2 h-full gap-1">
                <div className="col-span-2 bg-blue-400 rounded-sm">01</div>
                <div className="bg-blue-400 rounded-sm">02</div>
                <div className="bg-blue-400 rounded-sm">03</div>
              </div>
              <div className="grid grid-flow-col grid-rows-2 gap-1">
                <div className="bg-blue-400 col-span-2 rounded-sm">01</div>
                <div className="bg-blue-400 rounded-sm">02</div>
                <div className="bg-blue-400 col-span-2 rounded-sm">03</div>
                <div className="bg-blue-400 rounded-sm">04</div>
              </div>
            </div>

            {/* Rating and Comments */}
            <div className="p-4 space-y-4 flex flex-col">
              <div className="p-2 w-[80%] text-center self-center">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400 text-white rounded-full px-6 py-5 text-center">
                      <p className="text-4xl font-bold">4.3</p>
                      <p className="text-sm">out of 5</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      {["Excellent", "Very Good", "Average", "Poor", "Terrible"].map((label, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-24 text-sm">{label}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (ratingCount[label.toLowerCase().replace(" ", "")] / ratingCount.excellent) * 100,
                                  100
                                )}%`
                              }}
                            />
                          </div>
                          <span className="w-10 text-sm text-right">{ratingCount[label.toLowerCase().replace(" ", "")]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col gap-5 h-[280px] bg-white rounded-lg overflow-y-auto scrollbar">
                {[...predefinedComments, ...comments].map((comment, index) => (
                  <div key={index} className="bg-red-50 h-fit w-full flex gap-3 p-3 rounded-xl justify-center items-center">
                    <div className="bg-blue-400 rounded-full h-20 w-20"></div>
                    <div className="w-5/6">{comment}</div>
                  </div>
                ))}
              </div>

              <div className="p-8 flex flex-col gap-2">
                <div className="flex gap-6">
                  <div className="bg-blue-500 rounded-full h-15 w-17"></div>
                  <div className="relative w-full h-38">
                    <label className="absolute left-4 -top-3.5 text-emerald-900 text-sm px-1 rounded-xl bg-gradient-to-b from-[#faf4e8] to-[#fef2f2]">Message</label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full h-full pl-4 pt-4 text-lg border-solid bg-red-50 border-emerald-400 border-2 rounded-lg focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 ml-21 text-xl">
                  <label className="text-emerald-900">Rate:</label>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={star <= newRating ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddComment}
                  className="bg-blue-500 text-white w-30 h-10 rounded self-end mt-2"
                >
                  Add Comment
                </button>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-[400px] shrink-0 sticky top-10 self-start text-[#54331c]">
            <button onClick={onClose} className="absolute -right-13 -top-17 text-4xl font-bold">X</button>
            <div className="w-full space-y-4 rounded-2xl z-10 bg-white p-4 pt-6">
              <div className="border w-full rounded-xl">
                <div className="h-48 bg-gray-100 flex items-center justify-center rounded-xl">hotel room image</div>
              </div>
              <div className="flex justify-around">
                <span className="text-[#361c0a] px-2">AC</span>
                <span className="text-[#361c0a] px-2">2 Bed</span>
                <span className="text-[#361c0a] px-2">wifi</span>
              </div>
              <div className="pl-2">
                <p className="text-[#54331c]">Number of days: {numDays}</p>
              </div>
              <div className="p-2 mb-1">
                <span>Check-in</span>
                <CustomDatePicker
                  className="text-[#361c0a] border-[#361c0a]"
                  selectedDate={checkInDate}
                  onChange={handleCheckInChange}
                  highlightDates={getHighlightedDates()}
                />
              </div>
              <div className="p-2 mb-10 flex flex-col gap-2">
                <p>Check-out</p>
                <p className="text-gray-600 border border-[#361c0a] p-2 rounded-md w-[72%]">
                  {checkOutDate ? checkOutDate.toLocaleDateString() : "Not selected yet"}
                </p>
              </div>
              {[{ label: 'Adults', value: adults, set: setAdults, min: 1 }, { label: 'Children', value: children, set: setChildren, min: 0 }, { label: 'Rooms', value: rooms, set: setRooms, min: 1 }].map(({ label, value, set, min }, i) => (
                <div key={i} className="border px-2 py-1 rounded-sm flex items-center justify-between">
                  <p>{label} - {value}</p>
                  <div className="flex items-center">
                    <button onClick={() => set(Math.max(value - 1, min))} className="bg-rose-400 text-white font-extrabold px-2 pb-1 rounded" disabled={value <= min}>-</button>
                    <span className="mx-4">{value}</span>
                    <button onClick={() => set(value + 1)} className="bg-emerald-500 text-white px-1.5 pb-1 font-bold rounded">+</button>
                  </div>
                </div>
              ))}
              <div className="p-2 text-xl">
                <p>Price</p>
              </div>
              <div className="flex justify-center p-2">


                {/* add to cart button */}
                <button
  onClick={() => toggleCart(product)}
  className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition duration-300 ${isInCart(product.id) ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
>
  {isInCart(product.id) ? (
    <>
      <Trash2 className="w-4 h-4" />
      Remove from Cart
    </>
  ) : (
    <>
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </>
  )}
</button>


              </div>
              <div className="w-full h-fit bg-red-50">
                <Timer fontSize={24} width={28} height={30} labelFontSize={14} backgroundColor="#2d3748" digitColor="white" dividerColor="yellow" text="Hurry! Limited offer ends soon!" direction="col" />
              </div>
              <div className="flex flex-col gap-5 border rounded-xl bg-gradient-to-b from-cyan-100 to-rose-100 p-5">
                <div className="bg-red-500 rounded-full w-20 h-20 self-center"></div>
                <div className="self-center text-center">hey im here to help you can contact me</div>
                <div className="flex flex-col self-center gap-2">
                  <div className='flex'>
                    <LiaPhoneVolumeSolid size={30} className='text-green-700' />
                    <span>+91 9627743743</span>
                  </div>
                  <div className='flex'>
                    <HiOutlineMail size={30} className='text-gray-600' />
                    <span>my@email.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full h-90 flex gap-20 justify-center items-center">
        <div className="w-full h-full flex gap-20 justify-center items-center"> <div className="relative w-[20%] h-[80%] 
         overflow-hidden group bg-gradient-to-t from-yellow-100 to-fuchsia-200 
 transition-colors  rounded-xl duration-300 shadow-xl/70 ">
    {/* Overlay that animates on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 to-fuchsia-300 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100 z-0"></div>

    {/* Content goes on top */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-bold text-xl">
  <div className="w-30 h-30 mb-8 rounded-full overflow-hidden border-1 border-black group-hover:border-white mb-4">
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
  <div className="relative w-[20%] h-[80%] rounded-xl overflow-hidden group bg-gradient-to-t from-yellow-100 to-fuchsia-200  transition-colors duration-300 shadow-xl/70 ">
    {/* Overlay that animates on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 to-fuchsia-300 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100 z-0"></div>

    {/* Content goes on top */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-bold text-xl">
  <div className="w-30 h-30 mb-8 rounded-full overflow-hidden border-1 border-black group-hover:border-white mb-4">
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
  <div className="relative w-[20%] h-[80%] rounded-xl overflow-hidden group bg-gradient-to-t from-yellow-100 to-fuchsia-200   transition-colors duration-300 shadow-xl/70 ">
    {/* Overlay that animates on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 to-fuchsia-300 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100 z-0"></div>

    {/* Content goes on top */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-bold text-xl">
  <div className="w-30 h-30 mb-8 rounded-full overflow-hidden border-1 border-black group-hover:border-white mb-4">
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
      </div>

    </div>
  );
};