
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Tabs from "../components/Tabs/Tabs";
import { useState } from "react";
import { useLocation } from 'react-router-dom'

export default function ThankYouPage() {
    const shoppingCartLocalStorage = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []
    const [shoppingCart, setShoppingCart] = useState(shoppingCartLocalStorage)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get('orderid')
    const orderTime = queryParams.get('ordertime')
    console.log(orderId, orderTime)
    return (
        <div className="flex flex-col items-center h-screen">
            <Header shoppingCart={shoppingCart} />
            <div className="h-full items-center max-w-[432px] xl:max-w-[1160px] w-full flex flex-col xl:mt-[100px] mx-6 mt-[102px] justify-center">
                <div className="text-lg">
                    Thanks for your order.
                </div>
                <div>
                    訂單編號：{orderId}
                </div>
                <div>
                    訂購時間：{orderTime}
                </div>
            </div>
            
            <Footer />
            <Tabs shoppingCart={shoppingCart} />

        </div>
    )
}