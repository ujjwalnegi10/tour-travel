import { useState, useEffect } from "react"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Link2 } from "lucide-react"
import { Link } from 'react-router-dom';
export default function WishlistPage({ setActiveTab }) {
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])
  const [isHovered, setIsHovered] = useState(false);
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

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    const newWishlist = wishlist.filter((item) => item.id !== productId)
    setWishlist(newWishlist)
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
    triggerStorageEvent()
  }

  // Move from wishlist to cart
  const moveToCart = (product) => {
    // First check if product is already in cart
    if (!cart.some((item) => item.id === product.id)) {
      // Add to cart
      const newCart = [...cart, product]
      setCart(newCart)
      localStorage.setItem("cart", JSON.stringify(newCart))

      // Remove from wishlist
      const newWishlist = wishlist.filter((item) => item.id !== product.id)
      setWishlist(newWishlist)
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))

      triggerStorageEvent()
    }
  }
 

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId)
  }

  if (wishlist.length === 0) {
    return (
      <div>
         <div className="flex relative">
  <div className="w-2/5 h-screen relative">
    <div className="fixed w-2/5 h-screen p-0 m-0  bg-[url('./assets/two.jpeg')] bg-cover bg-center flex items-center border-2 border-transparent heart-wrapper">
    <div
            className={`rotate-45 -right-[92%] absolute heart ${
              isHovered ? "hovered" : ""
            }`}
          ></div>
    </div>
  </div>


     <div className="flex flex-col flex-1">
     <span className="text-3xl self-center text-center py-8 merienda">Your Wishlist : ({wishlist.length} items)</span>  
     <p className="text-gray-500 mt-2 text-2xl text-center" >Add some products to your wishlist to continue shopping.</p>
     <p className="w-full text-center"><Link to="/destination" className="hover:text-blue-800 text-2xl text-blue-400 underline text-shadow-lg text-center">Go to Products</Link></p>
     </div>
     
    </div>
      </div>
    )
  }

  return (
    <div className="flex relative">
  <div className="w-2/5 h-screen relative">
    <div className="fixed w-2/5 h-screen p-0 m-0  bg-[url('./assets/two.jpeg')] bg-cover bg-center flex items-center border-2 border-transparent heart-wrapper">
    <div
            className={`rotate-45 -right-[92%] absolute heart ${
              isHovered ? "hovered" : ""
            }`}
          ></div>
    </div>
  </div>


     
     <div className="flex flex-1 flex-col heart-wrapper2 bg-gradient-to-r from-rose-100 to-zinc-50"
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}>
       <span className="text-3xl self-center py-8 merienda">Your Wishlist : ({wishlist.length} items)</span>
       <div className="grid grid-cols-1 gap-6 pr-10 place-items-end items-start">

        {wishlist.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg w-5/6 flex shadow-lg h-[230px]">
            <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-1/2 border h-full object-cover" />
            <div className="mt-4  flex-1 px-5">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-2xl font-bold mt-2">${product.price}</p>
              <div className="mt-4 flex  w-full justify-between">
              <button className="w-fit flex justify-center items-center shadow-xl/20"
                onClick={() => removeFromWishlist(product.id)}
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  border: "1px solid #f5c6cb",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" /><span>Remove</span>
              </button>
              <button className="w-fit flex justify-center items-center p-2 shadow-xl/20 "
                onClick={() => moveToCart(product)}
                disabled={isInCart(product.id)}
                style={{
                  backgroundColor: isInCart(product.id) ? "#e2e6ea" : "#007bff",
                  color: isInCart(product.id) ? "#6c757d" : "#ffffff",
        
                  border: "1px solid #007bff",
                  borderRadius: "0.375rem",
                  cursor: isInCart(product.id) ? "not-allowed" : "pointer",
                }}
              >
                {isInCart(product.id) ? "Already in Cart" : <><ShoppingCart className="w-4 h-4 mr-2" /><span>Move to cart</span></>}
              </button>
            </div>
            </div>
            
          </div>
        ))}
      </div>
     </div>
    </div>
  )
}
