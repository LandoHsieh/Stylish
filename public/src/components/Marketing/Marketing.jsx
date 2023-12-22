import { useEffect, useState } from 'react'
import marketingImg1 from '../../assets/Marketing/marketing_img1.png'
import marketingImg2 from '../../assets/Marketing/marketing_img2.jpg'
import marketingImg3 from '../../assets/Marketing/marketing_img3.jpg'
export default function Marketing() {
    const images = [
        marketingImg1,
        marketingImg2,
        marketingImg3,
    ]
    const [imageIndex, setImageIndex] = useState(0)
    const [timeRunning, setTimeRunning] = useState(true)

    const pauseTimer = () => {
        setTimeRunning(false)
    }
    const startTimer = () => {
        setTimeRunning(true)
    }

    useEffect(() => {
        let timer
        if (timeRunning) {
            timer = setInterval(() => {
                setImageIndex((imageIndex) => imageIndex === images.length - 1 ? 0 : imageIndex + 1)
            }, 2000)
        }
        return () => clearInterval(timer)
    }, [timeRunning])

    return (
        <div className=' w-screen relative  xl:h-[500px] h-[250px] mt-[83px]' onMouseEnter={pauseTimer} onMouseLeave={startTimer}>
            <div className='absolute flex w-full justify-center bottom-2'>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={` relative z-10 duration-1000 opacity-70 ${index === imageIndex ? ' bg-orange-700' : ' bg-gray-400'} h-3 w-3 rounded-full m-2 cursor-pointer`}
                        onClick={() => setImageIndex(index)}
                    >
                    </div>
                ))}
            </div>
            <div className='w-full'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        className={` absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === imageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        </div>
    )
}