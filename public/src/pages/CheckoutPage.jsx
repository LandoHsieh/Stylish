import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Checkout from "../components/ShoppingCart/CheckoutCompo";
import OrderInfo from "../components/ShoppingCart/OrderInfoCompo";
import PaymentInfo from "../components/ShoppingCart/PaymentInfoCompo";
import ShoppingCart from "../components/ShoppingCart/ShoppingCartCompo";
import Tabs from "../components/Tabs/Tabs";
import TapPayInfoCompo from "../components/ShoppingCart/TapPayInfoCompo";

export default function CheckoutPage() {
    const shoppingCartLocalStorage = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []
    const [shoppingCart, setShoppingCart] = useState(shoppingCartLocalStorage)
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [deliveryTime, setDeliveryTime] = useState('')
    return (
        <div className="flex flex-col items-center">
            <Header shoppingCart={shoppingCart}/>
            <div className="max-w-[432px] xl:max-w-[1160px] w-full flex flex-col xl:mt-[100px] mx-6 mt-[102px] justify-center">
                <ShoppingCart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
                <OrderInfo 
                    setName={setName} 
                    setPhoneNumber={setPhoneNumber} 
                    setAddress={setAddress} 
                    setEmail={setEmail} 
                    setDeliveryTime={setDeliveryTime} 
                    name={name} 
                    phoneNumber={phoneNumber} 
                    address={address}
                />
                <TapPayInfoCompo 
                    shouldSubmit={shouldSubmit} 
                    setShouldSubmit={setShouldSubmit}
                    name={name}
                    phoneNumber={phoneNumber}
                    address={address}
                    email={email}
                    deliveryTime={deliveryTime} 
                />
                <Checkout 
                    shoppingCart={shoppingCart} 
                    onCheckoutClick={() => setShouldSubmit(true)}
                    name={name}
                    phoneNumber={phoneNumber}
                    address={address}
                    email={email}
                    deliveryTime={deliveryTime}
                />
            </div>
            <Footer />
            <Tabs shoppingCart={shoppingCart}/>
        </div>
    )
}