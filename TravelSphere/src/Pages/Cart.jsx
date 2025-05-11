import { useState, useEffect } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from 'react-router-dom';
export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  const triggerStorageEvent = () => {
    window.dispatchEvent(new Event("localStorageChange"));
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    triggerStorageEvent();
  };

  // Move product from cart back to wishlist
  const moveToWishlist = (product) => {
    // Check if product is already in wishlist
    if (!wishlist.some((item) => item.id === product.id)) {
      // Add to wishlist
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));

      // Remove from cart
      const newCart = cart.filter((item) => item.id !== product.id);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));

      triggerStorageEvent();
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 border p-6 rounded-lg text-center mt-50 ">
        <h2 className="text-4xl font-semibold  merienda pb-10">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 text-2xl">Add some products to your cart to continue shopping.</p>
        <p><Link to="/destination" className="hover:text-blue-800 text-2xl text-blue-400 underline text-shadow-lg">Go to Products</Link></p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-5xl font-bold mb-8 text-center merienda">Your Cart ({cart.length} items)</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product List */}
        <div className="lg:w-2/3 space-y-6 ">
          {cart.map((product) => (
            <div key={product.id} className="rounded-lg shadow-lg p-4 flex flex-col h-[250px] lg:flex-row bg-gradient-to-r from-cyan-200 to-rose-50">
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/2 h-full">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover rounded "
                  />
                  <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                    <h4 className="mt-4 font-medium">Details</h4>
                    <p className="text-gray-500 text-sm">More details</p>
                  </div>
                
                  <button
                    className="mt-2 w-1/2 flex items-center justify-center gap-2 py-2 bg-rose-100 text-rose-700 border border-rose-300 rounded hover:bg-rose-200"
                    onClick={() => moveToWishlist(product)}
                  >
                    <Trash2 className="w-5 h-5" /> Add to Wishlist
                  </button>
                </div>
              </div>
              <div className="lg:w-1/3 flex flex-col justify-between items-center mt-4 lg:mt-0">
                <p className="text-2xl font-bold text-blue-600 mt-10">Price :${product.price}</p>
                <button
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 border border-rose-300 rounded hover:bg-rose-200"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Trash2 className="w-5 h-5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-1/3 lg:w-1/3 pr-4 ">
          <div className="fixed top-20 bg-gradient-to-t from-sky-200 to-slate-50 p-6 rounded-lg shadow-xl/70 border w-[450px] z-10 mt-18">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(Number.parseFloat(calculateTotal()) * 1.1).toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-400 text-white rounded hover:bg-blue-700"
            >
              <ShoppingBag className="w-5 h-5" /> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
