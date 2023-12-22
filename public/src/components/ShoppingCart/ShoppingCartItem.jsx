import { useEffect, useState } from "react";
import trashcanIcon from '../../assets/cart-remove.png'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function ShoppingCartItem({ product, shoppingCart, setShoppingCart }) {
    const { title, id, color, size, price, mainImg, stock } = product
    
    
    const options = Array.from({ length: stock }, (_, index) => index + 1);
    
    //const [shoppingCart, setShoppingCart] = useState([])

    const [amount, setAmount] = useState(product.amount)
    // useEffect(() => {
    //     const loadedCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
    //     setShoppingCart(loadedCart)
    // }, [])

    const removeProduct = () => {
        const newShoppingCart = shoppingCart.filter((item) => {
            return !(item.id === id && item.color === color && item.size ===size)
        })
        setShoppingCart(newShoppingCart)
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart))
    }

    const changeAmount = (event) => {
        const newAmount = event.target.value;
        const newShoppingCart = shoppingCart.map((item) => {
            if (item.id === id && item.color === color && item.size === size) {
                return {
                    ...item,
                    amount: newAmount,
                    totalPrice: newAmount * price,
                };
            }
            return item;
        });
        console.log(newShoppingCart)
        setAmount(newAmount)
        setShoppingCart(newShoppingCart);
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
    }
    
    return (
        <tr className="">
            <td>
                <div id="img_info" className="flex ml-[30px] my-[40px]">
                    <div id="img">
                        <img src={mainImg} className="w-[114px]" />
                    </div>
                    <div id="info" className=" ml-4">
                        <div className=" mb-[18px]">{title}</div>
                        <div className=" mb-[22px]">{id}</div>
                        <div id="colorSize" className=" mb-[26px]">
                            <p className=" text-base mr-2 mb-[10px]">顏色 | {color}</p>
                            <p className="  text-base mr-2">尺寸 | {size}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className=" text-center">
                <select defaultValue={amount} onChange={changeAmount} className="border h-8 pl-4 w-20 border-natural-400 rounded-lg bg-zinc-100">
                    {
                        options.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))
                    }
                </select>
            </td>
            <td className=" text-center">TWD.{price}</td>
            <td className=" text-center">TWD.{amount * price}</td>
            <td className=" text-center">
                <img 
                    src={trashcanIcon} 
                    className=" cursor-pointer hover:bg-[url('../../../src/assets/cart-remove-hover.png')]"
                    onClick={() => {removeProduct()}}
                />
            </td>
        </tr>
    ) 
}