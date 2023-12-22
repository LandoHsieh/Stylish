import image1 from '../../assets/ProductImages/0.png'
import image2 from '../../assets/ProductImages/1.png'

export default function ProductDetail({story, images}) {
    //const imagesLocal = [image1, image2]
    return(
        <div id="detail" className="w-full flex-col h-full  ">
            <div className="flex w-full justify-between items-center mt-[70px] mb-11">
                <p className="xl:text-xl xl:mr-12 text-base  xl:w-[30%] w-[40%] text-yellow-800  font-normal tracking-[3px]">更多產品資訊</p>
                <div className="xl:w-full h-[0px] w-[60%] border border-stone-700"></div>
            </div>

            <div id="story" className="text-stone-700 xl:text-xl text-sm leading-[30px] w-full mb-[30px]">
                O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.
            </div>
            <div id="images" className=" flex-col w-full">
                {
                    images.map((image, idx) => (
                        <div key={idx} className="w-full xl:h-[540px] xl:mb-7  mb-[20px]">
                            <img src={image} className='h-full'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}