import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartMobileCompo from "./ShoppingCartMobileCompo";


export default function ShoppingCart({shoppingCart, setShoppingCart}) {
    //const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    //console.log("shoppingCart from cart page:", shoppingCart)
    
    return (
        <div className=" flex flex-col justify-center">
            <div id="desktopCompo" className="hidden xl:flex mx-[60px] justify-center">
                <table className="min-w-full w-auto mx-[60px] mt-[51px]">
                    <thead>
                        <tr>
                            <th className=" text-left">購物車({shoppingCart.length})</th>
                            <th>數量</th>
                            <th>單價</th>
                            <th>小計</th>
                        </tr>
                    </thead>

                    <tbody className=" border border-neutral-400 ">
                        {
                            shoppingCart.length > 0
                                ? shoppingCart?.map((product, idx) => (
                                    <ShoppingCartItem
                                        key={idx}
                                        product={product}
                                        shoppingCart={shoppingCart}
                                        setShoppingCart={setShoppingCart}
                                    />
                                    
                                ))
                                : 
                                <tr>
                                    <td className="h-16">
                                        <div className="flex pl-10 justify-start font-bold text-lg">
                                            購物車內尚無商品
                                        </div>
                                    </td>
                                </tr>
                        }


                    </tbody>
                </table>
            </div>

            <div id="mobileCompo" className="xl:hidden">
                <ShoppingCartMobileCompo shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
            </div>
            
        </div>

        // <div>

        //     <div className="border">
        //         <div id="product" className='flex'>
        //             <div id="imgInfo">
        //                 <img src="https://picsum.photos/seed/picsum/200/300"/>
        //             </div>
        //             <div id="countAmount">

        //             </div>
        //             <div id='trashCan'>

        //             </div>
        //         </div>
        //         <div id="product" className='flex'>
        //             <div id="imgInfo">
        //                 <img src="https://picsum.photos/seed/picsum/200/300"/>
        //             </div>
        //             <div id="countAmount">

        //             </div>
        //             <div id='trashCan'>

        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}