import Cart from "../Header/Cart";
import Member from "../Header/Member";

export default function Tabs ({shoppingCart}) {
    return(
        <div id='container' className="  xl:hidden flex w-full bg-black justify-around fixed  bottom-0 h-12 items-center">
            <div id='cart' className="group flex flex-1 items-center justify-center cursor-pointer">
                <Cart shoppingCart={shoppingCart}/>
                <p className=" text-white group-hover:text-yellow-700">購物車</p>
            </div>
            
            <div id='member' className="border-l-2 border-gray-500 group flex flex-1 items-center justify-center cursor-pointer">
                <Member />
                <p className=" text-white group-hover:text-yellow-700">會員</p>
            </div>
        </div>
        
    )
}