import { useState, useEffect } from 'react'
import axios from 'axios'
import ContentItem from './ContentItem'
import '../../CSS/skeleton.css'
import { useQuery } from "@tanstack/react-query"

export default function Contents({ category }) {

    /*
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const response = await axios.get(category)
                setProducts(response.data.data)
                if(response.data.next_paging !== undefined){
                    console.log(response.data.next_paging)
                }else{console.log("no next page")}
                
                setIsLoading(false)
            } catch (error) {
                console.log("Error fetching data: ", error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [category])
*/

    // const { data, isLoading, isError, error } = useQuery(
    //     ['products', category],
    //     () => axios.get(category),
    //     {
    //         keepPreviousData: true,
    //         onSuccess: (data) => {
    //             if (data.data.next_paging !== undefined) {
    //                 console.log(data.data.next_paging)
    //             } else {
    //                 console.log("no next page")
    //             }
    //         }
    //     })
    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['products', category],
        queryFn: () => axios.get(category)
    })

    const products = isLoading ? Array(6).fill({}) : data?.data?.data || []

    return (
        <div className=' my-7 flex justify-center w-full items-center '>
            {<div className=" w-[85%] grid xl:grid-cols-3 grid-cols-2 xl:gap-10 gap-[6px] mx-auto ">
                {isLoading
                    ? products.map((_, idx) => (
                        <div key={idx} className='skeleton'>
                            <div className=''>skeleton</div>
                        </div>
                    ))
                    : products.map((item, idx) => (
                        <ContentItem
                            key={idx}
                            id={item.id}
                            main_image={item.main_image}
                            colors={item.colors}
                            title={item.title}
                            price={item.price}
                        />))
                }
            </div>}
        </div>
    )
}