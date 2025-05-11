
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Timer } from '../Components/Timer'
import { LiaPhoneVolumeSolid } from 'react-icons/lia';
import { HiOutlineMail } from "react-icons/hi";
import { TiLocationOutline } from "react-icons/ti";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";

import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";


export const ContactUs = () => {

    const AuthContactus = z.object({
        firstname: z.string().min(1, { message: "* Require Firstname *" }).regex(/^[A-Za-z 0-9\s]+$/, { message: "* No special character *" }),
        lastname: z.string().min(1, { message: "* Require Lastname *" }).regex(/^[A-Za-z 0-9]+$/, { message: "* No special character *" }),
        email: z.string().min(1, { message: "* Can't be empty *" }).email({ message: "* Invalid email *" }),
        phoneno: z.string().min(1, { message: "* Can't be empty *" }),
        messagedata: z.string().min(1, { message: "* Can't be empty *" })
    })


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(AuthContactus)

    })

    const onSubmitting = (data) => {
        console.log(data)
    }



    return (
        <div className='flex w-screen h-screen  flex-col'>
            <div className='w-full h-1/8 bg-lime-300'><Timer 
  fontSize={24}
  width={30}
  height={29}
  labelFontSize={14}
  backgroundColor="#2d3748"
  digitColor="white"
  dividerColor="yellow"
  text="Hurry! Limited offer ends soon!"
  direction="row"
/>
 </div>


            <div className='h-full items-center pt-2 flex w-full bg-gradient-to-t from-cyan-300 to-lime-50'>
                <div className='w-3/5  h-3/4   flex flex-col pl-10 gap-20 items-center '>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <div className='text-6xl text-emerald-900'>Have Some Questions ?</div>
                        <span className='italic text-md mt-5 w-5/6 text-center text-cyan-800'>Fill in the form and take the first step toward your next adventure.
                            Our team’s ready to help you explore the world, one journey at a time.</span>
                    </div>

                    <div className=' w-full flex flex-col items-center italic space-y-5'>
                        <div className='text-5xl mb-10 text-cyan-700'>Get in touch</div>
                        <div className='flex'>
                            <LiaPhoneVolumeSolid size={30} className='text-green-700' />
                            <span>+91 9627743743</span>
                        </div>
                        <div className='flex'>
                            <HiOutlineMail size={30} className='text-gray-600' />
                            <span>my@email.com</span>
                        </div>
                        <div className='flex'>
                            <TiLocationOutline size={30} className='text-red-600' />
                            <span>Errornagar syntax colony invalid undefined , Null</span>
                        </div>

                        <div className='flex space-x-8'>
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
                    </div>

                </div>
                <div className='w-1/3 h-full flex relative bg-gradient-to-t from-cyan-300 to-lime-50 items-center justify-center border-hidden'>
                    <div className="absolute inset-0 bg-[url('./assets/bg4.jpg')] w-5/6  h-9/10 border-solid border-emerald-300 border-sm shadow-xl/80 border-t border-e opacity-70 top-1 bg-center left-2 bg-cover rounded-sm"></div>
                    <div className='w-5/6 h-9/10 flex items-center justify-center relative border-none'>
                        <div className="absolute inset-0 bg-[url('./assets/bg4.jpg')] bg-center bg-cover w-full shadow-xl/30 border-solid border-2 border-emerald-700 flex justify-center  text-emerald-800 italic rounded-sm text-4xl"><span className='pt-2 border-none'>Let's Chat</span></div>
                        <form onSubmit={handleSubmit(onSubmitting)} className='flex flex-col  h-2/3 w-4/5'>
                            <div className="relative w-full m-0 flex flex-1 gap-5">
                                <div className='w-1/2 h-full'>
                                    <label className="absolute left-4 -top-3.5   bg-white text-emerald-900 text-sm px-1 rounded-xl">Firstname</label>
                                    <input autoComplete='off' type='text' {...register("firstname")} className="w-full h-1/3   caret-emerald-800  text-lg border-solid border-emerald-400 border-2 rounded-lg p-4 bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"></input>
                                    {errors.firstname?.message && <p className="absolute  text-red-500 text-xs left-3">{errors.firstname?.message}</p>}
                                </div>
                                <div className='relative w-1/2 h-full'>
                                    <label className="absolute left-4 -top-3.5  bg-white text-emerald-900 text-sm px-1 rounded-xl">Lastname</label>
                                    <input autoComplete='off' type='text' {...register("lastname")} className="w-full h-1/3 caret-emerald-800 bg-white/50 bg-opacity-20   text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"></input>
                                    {errors.lastname?.message && <p className="absolute  text-red-500 text-xs left-3">{errors.lastname?.message}</p>}
                                </div>

                            </div>

                            <div className="relative w-full flex-1 m-0">
                                <label className="absolute  left-4 -top-3.5 bg-white text-emerald-900 text-sm px-1 rounded-xl">Email</label>
                                <input type='email' autoComplete='off' {...register("email")} className="w-full h-1/3  caret-emerald-800 bg-white/50 bg-opacity-20   text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"></input>
                                {errors.email?.message && <p className="absolute  text-red-500 text-xs left-3">{errors.email?.message}</p>}</div>


                            <div className="relative w-full flex-1 m-0">
                                <label className="absolute left-4 -top-3.5 bg-[#f3fffe] text-emerald-900 text-sm px-1 rounded-xl">Phone No.</label>
                                <input type='text' autoComplete='off' {...register("phoneno")} className="w-full h-1/3  caret-emerald-800  bg-[#e8fffe]/50 bg-opacity-20   text-lg border-solid border-emerald-400 border-2 rounded-lg p-4  focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"></input>
                                {errors.phoneno?.message && <p className="absolute  text-red-500 text-xs left-3">{errors.phoneno?.message}</p>}
                            </div>
                            <div className="relative w-full flex-1 m-0">
                                <label className="absolute left-4 -top-3.5 bg-[#e3ffff] text-emerald-900 text-sm px-1 rounded-xl">Message</label>
                                <textarea type='message' autoComplete='off' {...register("messagedata")} className="w-full h-full pl-4 bg-[#d9ffff]/30 bg-opacity-50 caret-emerald-800   text-lg border-solid border-emerald-400 border-2 rounded-lg  text-top  focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 focus:outline-none"></textarea>
                                {errors.messagedata?.message && <p className="absolute  text-red-500 text-xs left-3">{errors.messagedata?.message}</p>}</div>
                            <div className='w-full relative flex-1 flex justify-center m-0'>
                                <input type='submit' className=" bg-emerald-600/70 bg-opacity-50 mb-2 text-white  py-2 h-1/2 mt-7 w-1/4 rounded hover:bg-emerald-500 transition-colors cursor-pointer" ></input>
                            </div>




                        </form>
                    </div>
                </div>


            </div>



        </div>
    )
}












