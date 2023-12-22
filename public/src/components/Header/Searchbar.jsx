import searchIcon from '../../assets/search.png'
import search_hover from '../../assets/search-hover.png'
import { useState } from 'react'
export default function Searchbar({ onCategoryChange }) {
    const [searchIconHover, setSearchIconHover] = useState(false)
    const [searchKeyWords, setSearchKeyWords] = useState('')

    const handleInputChange = (event) => {
        setSearchKeyWords(event.target.value)
    }
    return (
        <div className=' border rounded-full px-4 mr-[42px] h-full flex justify-between bg-white'>
            <input
                className=' flex  border-solid focus:outline-none placeholder-yellow-800'
                placeholder='牛仔'
                type='text'
                value={searchKeyWords}
                onChange={handleInputChange}
            />


            <img
                className=' cursor-pointer'
                src={searchIconHover ? search_hover : searchIcon}
                onClick={() => onCategoryChange(`https://ec2-18-136-130-136.ap-southeast-1.compute.amazonaws.com/api/api/1.0/products/search?keyword=${searchKeyWords}`)}
                onMouseEnter={() => setSearchIconHover(true)}
                onMouseLeave={() => setSearchIconHover(false)} />
        </div>
    )
}