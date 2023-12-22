import { useRef } from "react"


export default function Checkout({
    shoppingCart, 
    onCheckoutClick, 
    name,
    phoneNumber,
    address,
    email,
    deliveryTime
    }) 
{
    //const history = useHistory()

    let totalPrice = 0
    shoppingCart.map(item => {
        totalPrice += item.totalPrice
    })
    const shoppingFee = 30

    const handleCheckoutBtn = () => {
        window.location.href = "https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/user/signin"
    }

    // const paymentInfoRef = useRef(null)
    // const handleCheckoutClick = () => {
    //     if(paymentInfoRef.current){
    //         paymentInfoRef.current.submit()
    //     }
    // }

    console.log("totalPrice = ", totalPrice)
    return (
        <div className=" flex flex-col items-end mx-[26px] xl:mx-[60px] mb-[148px]">
            <div id="checkout" className=" flex flex-col  w-60 ">
                <div className=" flex flex-col gap-[37px] border-b-2 border-stone-700 pb-7">
                    <div className="flex justify-between items-center">
                        <div className=" text-base text-stone-700 font-normal">總金額</div>
                        <div className="flex gap-2 items-center">
                            <div className=" text-base text-stone-700 font-normal"> NT.</div>
                            <div className=" text-stone-700 text-3xl font-normal">{totalPrice}</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className=" text-base text-stone-700 font-normal">運費</div>
                        <div className="flex gap-2 items-center">
                            <div className=" text-base text-stone-700 font-normal"> NT.</div>
                            <div className=" text-stone-700 text-3xl font-normal">{shoppingFee}</div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="flex justify-between mt-[29px] mb-[58px] items-center">
                        <div className="text-base text-stone-700 font-normal">應付金額</div>
                        <div className="flex gap-2 items-center">
                            <div className=" text-base text-stone-700 font-normal"> NT.</div>
                            <div className=" text-stone-700 text-3xl font-normal">{totalPrice+shoppingFee}</div>
                        </div>
                    </div>
                    <button 
                        className="hidden xl:block  bg-black text-white text-xl font-normal text-center w-full h-16 "
                        onClick={onCheckoutClick}
                        disabled={!(name && phoneNumber && address && email && deliveryTime)}
                        >
                        確認付款
                    </button>

                </div>
                

            </div>
            <button 
                className="block xl:hidden  bg-black text-white text-base font-normal text-center w-full h-[44px] "
                onClick={onCheckoutClick}
                disabled={!(name && phoneNumber && address && email && deliveryTime)}
                >
                確認付款
                </button>
        </div>

    )
}