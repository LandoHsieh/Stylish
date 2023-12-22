import { useState } from "react"

export default function OrderInfo({ setName, setPhoneNumber, setAddress, setEmail, setDeliveryTime, name, phoneNumber, address }) {

    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidNumber, setIsValidNumber] = useState(true);
    const [isName, setIsName] = useState(true)

    const [isAddress, setIsAddress] = useState(true)
    const [isDeliveryTime, setIsDeliveryTime] = useState(true)

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/
        return regex.test(email)
    }
    const validateNumber = (number) => {
        const regex = /^09\d{8}$/
        return regex.test(number)
    }
    const handleEmailBlur = (event) => {
        const inputEmail = event.target.value
        if(validateEmail(inputEmail)){
            setEmail(inputEmail)
            setIsValidEmail(true)
        }else{
            setEmail('')
            setIsValidEmail(false)
        }
    }
    const handleNameBlur = () => {
        if (name){
            setIsName(true)
        }else{
            setIsName(false)
        }
    }
    const handlePhoneBlur = (event) => {
        const inputNumber = event.target.value
        if(validateNumber(inputNumber)){
            setPhoneNumber(inputNumber)
            setIsValidNumber(true)
        }else{
            setPhoneNumber('')
            setIsValidNumber(false)
        }
    }
    const handleAddressBlur = () => {
        if (address){
            setIsAddress(true)
        }else{
            setIsAddress(false)
        }
    }
    return (
        <div className="mx-6  xl:mx-[60px] ">
            <div className=" mb-[25px]">
                <div className="text-base font-bold text-stone-700 mb-4">訂購資料</div>
                <div className="h-[0px] w-full border border-stone-700"></div>
            </div>
            <div className="mb-[50px] gap-9 flex flex-col ">
                <div className="max-w-[685px]">
                    <div className="xl:flex">
                        <div className="text-sm xl:text-base w-[120px] text-stone-700  font-normal">收件人姓名</div>
                        <input
                            className={`${isName ? '':' border-red-500'} border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px]`}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            onBlur={handleNameBlur}
                        />
                    </div>
                    <p className="text-sm mt-[10px]  font-normal text-yellow-800 text-left xl:text-base xl:text-right">務必填寫完整收件人姓名，避免包裹無法順利簽收</p>
                </div>

                <div className=" max-w-[685px] xl:flex">
                    <div className=" w-[120px] text-stone-700 text-sm xl:text-base font-normal">手機</div>
                    <input
                        className={`${isValidNumber ? '':' border-red-500'} border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px]`}
                        type="text"
                        maxLength="10"
                        onBlur={handlePhoneBlur}
                    />
                </div>

                <div className=" max-w-[685px] xl:flex">
                    <div className=" w-[120px] text-stone-700 text-sm xl:text-base font-normal">地址</div>
                    <input
                        className={`${isAddress ? '':' border-red-500'} border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px]`}
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={handleAddressBlur}
                    />
                </div>
                <div className=" max-w-[685px] xl:flex">
                    <div className=" w-[120px] text-stone-700 text-sm xl:text-base font-normal">Email</div>
                    <input
                        className={`border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px] ${isValidEmail ? '':' border-red-500'} `}
                        type="text"
                        onBlur={handleEmailBlur}

                    />
                </div>
                <div className=" max-w-[685px] xl:flex">
                    <div className=" w-[120px] text-stone-700 text-sm xl:text-base font-normal">配送時間</div>
                    <div id="group_radio" className="flex gap-[26px] text-sm xl:text-base">
                        <div id="am">
                            <input
                                type="radio"
                                value="morning"
                                name="deliveryTime"
                                onChange={(e) => setDeliveryTime(e.target.value)}
                            />
                            <span className="ml-[6px]">08:00-12:00</span>
                        </div>
                        <div id="pm">
                            <input
                                type="radio"
                                value="afternoon"
                                name="deliveryTime"
                                onChange={(e) => setDeliveryTime(e.target.value)}
                            />
                            <span className="ml-[6px]">14:00-18:00</span>
                        </div>
                        <div id="anytime">
                            <input
                                type="radio"
                                value="anytime"
                                name="deliveryTime"
                                onChange={(e) => setDeliveryTime(e.target.value)}
                            />
                            <span className="ml-[6px]">不指定</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}