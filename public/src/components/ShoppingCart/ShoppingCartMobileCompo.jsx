import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartItemMobile from "./ShoppingCartItemMobile";

export default function ShoppingCartMobileCompo({ shoppingCart, setShoppingCart }) {

    return (
        <div className=" max-w-[432px] mx-6 my-[20px] flex flex-col  ">
            <div className=" text-sm font-bold text-stone-700  mb-[10px]">購物車({shoppingCart.length})</div>
            <div id="cartItems" className="flex flex-col gap-[20px]">
                {
                    shoppingCart.map((product, idx) => (
                        <ShoppingCartItemMobile key={idx} product={product} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
                    ))
                }
            </div>
        </div>
    )
}