import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import Swal from 'sweetalert2'
export default function ProductInfo({ productInfo }) {
    const {
        id,
        title,
        price,
        note,
        main_image,
        place,
        description,
        texture,
        wash,
        colors,
        sizes,
        variants
    } = productInfo


    const [selectedColor, setSelectedColor] = useState(0)
    const [selectedColorCode, setSelectedColorCode] = useState(productInfo.colors[0].code)
    const [selectedColorName, setSelectedColorName] = useState(productInfo.colors[0].name)

    const [selectedSize, setSelectedSize] = useState(0)
    const [selectedSizeName, setSelectedSizeName] = useState(productInfo.sizes[0])
    const item = variants.find(item => item.size === selectedSizeName && item.color_code === selectedColorCode)
    const [stock, setStock] = useState(item ? item.stock : 0)
    const [amount, setAmount] = useState(0)

    //const [sizeClickable, setSizeClickable] = useState(stock == 0 ? false : true)

    const [shoppingCart, setShoppingCart] = useState(localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : [])
    //console.log(shoppingCart)

    //console.log(productInfo.colors[0].code)
    
    const handleColorBtn = (idx, color_code, color_name) => {
        setAmount(0)
        setSelectedColor(idx)
        setSelectedColorCode(color_code)
        setSelectedColorName(color_name)
        const item = variants.find(item => item.size === selectedSizeName && item.color_code === color_code)
       
        setStock(item.stock)
    }

    const handleSizeBtn = (idx, size_name) => {
        setAmount(0)
        setSelectedSize(idx)
        setSelectedSizeName(size_name)
        const item = variants.find(item => item.size === size_name && item.color_code === selectedColorCode)
       
        setStock(item.stock)
    }

    const handleMinusBtn = () => {
        if (amount === 0) return
        setAmount(amount - 1)
    }

    const handlePlusBtn = (stock) => {
        if (amount >= stock) return
        setAmount(amount + 1)
    }

    const sizeClickable = (size_name) => {
        const hasStock = variants.find(item => item.size === size_name && item.color_code === selectedColorCode)
        return hasStock && hasStock.stock > 0
    }
    const colorClickable = (color_code) => {
        const hasStock = variants.find(item => item.size === selectedSizeName && item.color_code === color_code)
        return hasStock && hasStock.stock > 0
    }

    const addProductToLocalStorage = () => {
        const add2cart = {
            id,
            title,
            color: selectedColorCode,
            colorName: selectedColorName,
            size: selectedSizeName,
            price,
            totalPrice: amount * price,
            amount: amount,
            mainImg: main_image,
            stock
        }
        setShoppingCart(JSON.parse(localStorage.getItem('shoppingCart')))
        console.log(shoppingCart)
        
        const sameProductIdx = shoppingCart.findIndex(item => item.id === id && item.color === selectedColorCode && item.size === selectedSizeName)
        if(sameProductIdx !== -1){
            shoppingCart[sameProductIdx].amount += amount
            shoppingCart[sameProductIdx].totalPrice = shoppingCart[sameProductIdx].amount * price
            setShoppingCart(shoppingCart)
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
        }else{
            const newShoppingCart = [...shoppingCart, add2cart]
            setShoppingCart(newShoppingCart)
            localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart))
        }
        //alert(`${title} 已加入購物車！`)
        Swal.fire({
            position: "center",
            icon: "success",
            title: `${title} 已加入購物車！`,
            showConfirmButton: false,
            timer: 1500
          });
        
    }


    return (

        <div id="info" className="xl:flex xl:flex-row xl:items-center xl:justify-center w-full flex flex-col   ">
            <div id="infoLeft" className="xl:w-[58%] xl:h-[747px]  w-full ">
                <img src={main_image} className="h-full w-full" />
            </div>

            <div id="infoRight" className=" xl:px-5 xl:w-[42%] mt-4 mx-6">
                <div id="top" className=" border-b-2">
                    <p className=" xl:text-[32px] text-xl">{title}</p>
                    <p className=" xl:text-lg text-base text-gray-400 mt-4 font-light">{id}</p>
                    <p className=" xl:text-3xl text-xl mt-10 pb-5 font-normal">TWD.{price}</p>
                </div>

                <div id="middle" className=" flex-col justify-between">
                    <div id="color" className="flex my-[26px] items-center w-[70%]">
                        <p className=" xl:text-xl text-sm mr-2">顏色 | </p>
                        <div id="colorBtn" className="flex justify-start w-[70%] items-center">
                            {colors.map((color, idx) => (
                                <div id="btnBorder" key={idx} className={`m-2 ${colorClickable(color.code) ? 'hover:border':''} hover:border-neutral-400 w-9 h-9 pr-[5px] pl-[5px] pt-[5px]`}>
                                    <button
                                        className={`h-6 w-6  ${selectedColor === idx ? " border-[3px] border-orange-400" : ""} `}
                                        style={{ backgroundColor: `#${color.code}` }}
                                        disabled={!colorClickable(color.code)}
                                        onClick={() => handleColorBtn(idx, color.code, color.name)}
                                    />
                                </div>

                            ))}
                        </div>

                    </div>

                    <div id="size" className=" flex mb-[26px] items-center w-[70%]">
                        <p className="xl:text-xl text-sm mr-2">尺寸 | </p>
                        <div id="sizeBtn" className="flex w-[65%] justify-start">
                            {sizes.map((size, idx) => (
                                <button
                                    key={idx}
                                    className={` rounded-full  ${sizeClickable(size) ? 'hover:text-white hover:bg-black' : 'bg-opacity-25 text-opacity-25'} w-9 h-9 m-2 ${ sizeClickable(size) && selectedSize === idx ? " bg-black text-white" : "bg-gray-200"}`}
                                    disabled={!sizeClickable(size)}
                                    onClick={() => handleSizeBtn(idx, size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div id="amount" className=" flex mb-[26px] items-center w-[70%]">
                        <p className="xl:text-xl text-sm mr-3">數量 | </p>
                        <div className=" flex border justify-between items-center w-[65%] h-[40px] ">
                            <button className=" ml-4" onClick={() => handleMinusBtn()}>-</button>
                            <p>{amount}</p>
                            <button className=" mr-4" onClick={() => handlePlusBtn(stock)}>+</button>
                        </div>
                    </div>

                    <div id="add2cartBtn" className=" w-full mb-10">
                        <button 
                            className={`xl:text-xl text-base w-full h-16 ${stock === 0 ? " bg-gray-500" : " bg-black" } text-white`}
                            disabled={stock === 0}
                            onClick={() => addProductToLocalStorage()}
                        >
                            {
                                stock === 0 ? "此商品已無庫存" : "加入購物車"
                            }
                        </button>
                    </div>
                </div>

                <div id="bottom" className="h-[240px]">
                    <div className="flex-col justify-between h-full xl:text-xl text-sm">
                        <p>{note}</p>
                        <p>{texture}</p>
                        <p>清洗：{wash}</p>
                        <p>產地：{place}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
