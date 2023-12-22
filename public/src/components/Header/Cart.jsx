import { useState } from "react"
import cartIcon from '../../assets/cart.png'
import cart_hover from '../../assets/cart-hover.png'
import { Link } from "react-router-dom"
export default function Cart({shoppingCart}) {

    const shoppingCartAmount = shoppingCart ? shoppingCart.length : 0

 
    return (
        <Link to='/checkout'>
            <div className="relative ">
                <div className=" absolute right-0 bottom-0 w-6 h-6 rounded-full bg-yellow-800 text-center text-white">
                    {shoppingCartAmount}
                </div>
                <img
                    className=" cursor-pointer  h-full group-hover:bg-[url('../../../src/assets/cart-hover.png')]"
                    src={cartIcon}
                    />
            </div>


        </Link>

    )
}