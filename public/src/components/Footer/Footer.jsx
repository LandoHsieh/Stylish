import lineIcon from '../../assets/line.png'
import twitterIcon from '../../assets/twitter.png'
import facebookIcon from '../../assets/facebook.png'
import React from 'react'


export default function Footer() {
    return (
        <footer className="flex items-center bg-neutral-800 py-4 mb-12 xl:mb-0 mt-auto w-full h-[115px]">
            <div id="footerDesktop" className=" container mx-auto justify-around xl:flex hidden">
                <div className="text-neutral-100 text-base flex items-center">
                    <a href="#" className=" hover:text-gray-300 px-4 border-r-2 border-gray-400">關於STYLiSH</a>
                    <a href="#" className=" hover:text-gray-300 px-4 border-r-2 border-gray-400">服務條款</a>
                    <a href="#" className=" hover:text-gray-300 px-4 border-r-2 border-gray-400">隱私政策</a>
                    <a href="#" className=" hover:text-gray-300 px-4 border-r-2 border-gray-400">聯絡我們</a>
                    <a href="#" className=" hover:text-gray-300 px-4">FAQ</a>
                </div>

                <div className="flex justify-between space-x-4 items-center">
                    <img className=' cursor-pointer h-[50px]' src={lineIcon} />
                    <img className=' cursor-pointer h-[50px]' src={twitterIcon} />
                    <img className=' cursor-pointer h-[50px]' src={facebookIcon} />
                    <div className="text-xs text-zinc-500">
                        © 2023 STYLish. All rights reserved.
                    </div>
                </div>
            </div>

            <div id="footerMobile" className='xl:hidden h-auto w-full items-center justify-around mx-auto'>
                <div className='flex justify-around mx-auto'>
                    <div className='flex text-neutral-300'>
                        <div className='  flex flex-col justify-between  h-full'>
                            <a href="#" className=" hover:text-gray-300 px-4 text-xs border-r-2 border-gray-400">關於STYLiSH</a>
                            <a href="#" className=" hover:text-gray-300 px-4 text-xs border-r-2 border-gray-400">服務條款</a>
                            <a href="#" className=" hover:text-gray-300 px-4 text-xs border-r-2 border-gray-400">隱私政策</a>
                        </div>
                        <div className='flex flex-col'>
                            <a href="#" className=" hover:text-gray-300 px-4 text-xs border-gray-400">聯絡我們</a>
                            <a href="#" className=" hover:text-gray-300 px-4 text-xs">FAQ</a>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4 items-center">
                        <img className=' cursor-pointer h-7' src={lineIcon} />
                        <img className=' cursor-pointer h-7' src={twitterIcon} />
                        <img className=' cursor-pointer h-7' src={facebookIcon} />
                    </div>
                </div>

                <div className=" text-xs text-zinc-500 text-center my-4">
                    © 2023 STYLish. All rights reserved.
                </div>


            </div>
        </footer>
    )
}