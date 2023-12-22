

export default function PaymentInfo() {
    return (
        <div className="mx-6 xl:mx-[60px] mt-[50px]">
            <div className=" mb-[25px]">
                <div className=" text-base font-bold text-stone-700 mb-4">付款資料</div>
                <div className="h-[0px] w-full border border-stone-700"></div>
            </div>
            <div className="mb-[50px] gap-9 flex flex-col ">
                <div className=" max-w-[685px] xl:flex">
                    <div className=" w-[120px] text-stone-700 text-sm xl:text-base font-normal">信用卡號碼</div>
                    <input
                        className=" h-8 xl:h-auto border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px]"
                        type="text"
                        placeholder="**** **** **** ****"
                    />
                </div>

                <div className=" max-w-[685px] xl:flex">
                    <div className=" w-[120px] text-stone-700 text-sm xl:text-base font-normal">有效期限</div>
                    <input
                        className="border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px]"
                        type="text"
                        placeholder="MM / YY"
                    />
                </div>
                <div className=" max-w-[685px] xl:flex">
                    <div className="w-[120px] text-stone-700 text-sm xl:text-base font-normal">安全碼</div>
                    <input
                        className="border rounded-lg focus:outline-none pl-[10px] w-full xl:w-[576px]"
                        type="text"
                        placeholder="後三碼"
                    />
                </div>
            </div>
        </div>
    )
}