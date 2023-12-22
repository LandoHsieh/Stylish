import Searchbar from "./Searchbar";
import Cart from "./Cart";
import Member from "./Member";
import LogoIcon from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import search_hover from '../../assets/search-hover.png'
import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Link } from "react-router-dom";

export default function Header({ onCategoryChange, shoppingCart }) {
    const [searchIconHover, setSearchIconHover] = useState(false)
    const [isSearching, setIsSearching] = useState(false)


    return (
        <header className="w-full fixed z-50 bg-white">
            <div id="headerDesktop" className="bg-white w-full xl:flex hidden border-b-15 border-black h-[100px] items-center ">
                <div className=" mx-10 flex justify-start  w-full items-center h-[48px]">
                    <Link to='/' className="h-full">
                        <img className=" cursor-pointer h-full" src={LogoIcon}></img>
                    </Link>
                    <div className=" items-center h-7 flex">
                        <Link to='/' className="h-full">
                            <button onClick={() => onCategoryChange('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/women')} className="text-gray-800 hover:text-yellow-800 px-4 text-lg border-r-2 border-black">
                                女裝
                            </button>
                        </Link>
                        <Link to='/' className="h-full">
                        <button onClick={() => onCategoryChange('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/men')} className="text-gray-800 hover:text-yellow-800 px-4 text-lg border-r-2 border-black">
                            男裝
                        </button>
                        </Link>
                        <Link to='/' className="h-full">
                        <button onClick={() => onCategoryChange('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/accessories')} className="text-gray-800 hover:text-yellow-800 px-4 text-lg">
                            配件
                        </button>
                        </Link>



                    </div>
                </div>
                <div className=" flex items-center h-[44px] w-full mr-5 justify-end">
                    <Searchbar onCategoryChange={onCategoryChange} />
                    <Cart shoppingCart={shoppingCart}/>
                    <Member />
                </div>

            </div>
            <div id="headerMobile" className="w-full  xl:hidden ">
                <div className="w-full">
                    <div id='logo' className="flex h-[52px] justify-between items-center w-full bg-white">
                        <Link to='/' className=" flex-auto  flex justify-center">
                            <img className=" cursor-pointer h-6 object-center" src={LogoIcon} />
                        </Link>
                        <img
                            id="searchIcon"
                            className=' cursor-pointer h-10'
                            src={searchIconHover ? search_hover : searchIcon}
                            onClick={() => {
                                setIsSearching(true)
                            }}
                            onMouseEnter={() => setSearchIconHover(true)}
                            onMouseLeave={() => setSearchIconHover(false)} />
                    </div>
                    <div id="searchBar" className={`${isSearching ? '' : 'hidden'} flex items-center justify-center bg-gray-200`}>
                        <Searchbar onCategoryChange={onCategoryChange} />
                        <AiOutlineCloseCircle size={25} className=" ml-3" onClick={() => { setIsSearching(false) }} />
                    </div>
                </div>
                <Link to='/' className="h-full">
                <div id="categoryTab" className="bg-neutral-700 h-[50px] xl:hidden flex justify-around w-full items-center">
                
                    <button onClick={() => onCategoryChange('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/women')} className="text-white hover:text-gray-600 px-4 text-base text-center">女裝</button>
                    <button onClick={() => onCategoryChange('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/men')} className="text-white hover:text-gray-600 px-4 text-base text-center">男裝</button>
                    <button onClick={() => onCategoryChange('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/accessories')} className="text-white hover:text-gray-600 px-4 text-base text-center" >配件</button>
                </div>
                </Link>
            </div>

        </header >

    )
}