import { useState } from "react"

export default function ShoppingCartItemMobile({ product, shoppingCart, setShoppingCart }) {

    const { mainImg, title, id, color, size, stock, price} = product

    const [amount, setAmount] = useState(product.amount)

    const createOptions = (stock) => {

        const options = []
        for (let i = 1; i <= stock; i++) {
            options.push(
                <option key={i} value={i}>{i} </option>
            )
        }
        return options
    }

    const changeAmount = (event, product) => {
        const { id, size, color, price } = product
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
        setShoppingCart(newShoppingCart)
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
    }


    const removeProduct = (id, size, color) => {
        const newShoppingCart = shoppingCart.filter((item) => {
            return !(item.id === id && item.color === color && item.size === size)
        })
        setShoppingCart(newShoppingCart)
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart))
    }

    return (
        <div className=" border-t-2 border-stone-700">
            <div className="flex mt-[20px] justify-between">
                <div id="img_info" className="flex ">
                    <div id="img">
                        <img src={mainImg} className="w-[114px]" />
                    </div>
                    <div id="info" className=" text-sm ml-4">
                        <div className=" mb-[20px] ">{title}</div>
                        <div className=" mb-[24px]">{id}</div>
                        <div id="colorSize" className=" mb-[26px]">
                            <div className=" mr-2 mb-[12px]">顏色 | {color}</div>
                            <div className="mr-2">尺寸 | {size}</div>
                        </div>
                    </div>
                </div>
                <div id="trashcan">
                    <img
                        src='../../../src/assets/cart-remove.png'
                        className=" cursor-pointer hover:bg-[url('../../../src/assets/cart-remove-hover.png')]"
                        onClick={() => { removeProduct(id, size, color) }}
                    />
                </div>
            </div>

            <div className="flex justify-around text-sm text-center w-full ">
                <div className="flex flex-col gap-3">
                    數量
                    <select defaultValue={amount} onChange={(event) => changeAmount(event, product)} className="border h-8 pl-4 w-20 border-natural-400 rounded-lg bg-zinc-100">
                        {
                            createOptions(stock).map((opt) => (
                                opt
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-3">
                    單價
                    <div>
                        TWD.{price}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    小計
                    <div>
                        TWD.{amount * price}
                    </div>
                </div>

            </div>


        </div>
    )
}