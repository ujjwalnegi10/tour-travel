import { Link } from 'react-router-dom';
import { ImFacebook2, ImOffice } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { useEffect } from 'react';
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";

export const Footer =()=>{
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
        
        <div className="w-full h-[500px] bg-[url('./assets/footer.jpg')] bg-cover bg-center flex">
<div className="w-1/2 h-full">
<div>
        <h3 className="text-4xl font-semibold mb-4  pl-20 pb-5 pt-20 merienda">Connect with Us</h3>
        
        <div className='flex space-x-8 pl-20'>
                            <span><ImFacebook2 size={30} className='text-blue-600' />
                            </span>
                            <span><FaInstagram
                                size={30} className=' bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border rounded-sm' />
                            </span>
                            <span><BsTwitterX size={30} />
                            </span>
                            <span><IoLogoYoutube size={30} className='text-red-600' />
                            </span>
                        </div>
      </div></div>
<div className="w-1/2 h-full flex justify-center items-end gap-15 pb-10 ">
<div className='flex  flex-col text-xl merienda'>
        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/destination" className="hover:text-blue-400">Destinations</Link></li>
          <li><Link to="/gallery" className="hover:text-blue-400">Gallery</Link></li>
          <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
        </ul>
      </div>
        {/* Contact Info */}
        <div  className='flex flex-col  merienda text-xl'>
        <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
        <ul className="space-y-2">
          <li>Email: info@travelsphere.com</li>
          <li>Phone: +1 234 567 8900</li>
          <li>Address: 123 Travel Lane, Adventure City</li>
        </ul>
      </div>

</div>
        </div>
        
        
        </>
    )
}