import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Tabs from "../components/Tabs/Tabs"
import { useState, useMemo, useEffect, Suspense } from "react"
import ProductDetail from "../components/ProductDetail/ProductDetail"
import ProductInfo from "../components/ProductDetail/ProductInfo"



export default function ProductPage() {
    const shoppingCartLocalStorage = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []
    const [shoppingCart, setShoppingCart] = useState(shoppingCartLocalStorage)
    const { id } = useParams()
    const [category, setCategory] = useState('https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/all')
    
    const url = `https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/details?id=${id}`
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['productDetail', id],
        queryFn: () => axios.get(url)
    })

    if (!data) {
        return
    }

    console.log("data: ", data)



    const handleCategoryChange = (newCategory) => {
        //setCategory(newCategory)
    }

    // if (!isLoading) {
    //     console.log(data.data.data)
    // }


    return (
        <div className=' flex flex-col w-full items-center'>
            <Header onCategoryChange={handleCategoryChange} shoppingCart={shoppingCart}/>
            <div className="max-w-[960px] flex flex-col xl:mt-[100px] mx-6 mt-[102px] mb-12 justify-center items-center">
                <ProductInfo
                    productInfo={!isLoading ? data?.data?.data : null}
                />
                
                <ProductDetail 
                    story={data.data.data.story}
                    images={data.data.data.images}
                    // story={!isLoading ? data?.data?.data?.story : null}
                    // images={!isLoading ? data?.data?.data?.images : null}
                />
            </div>

            <Footer />
            <Tabs shoppingCart={shoppingCart}/>
        </div>

    )
}