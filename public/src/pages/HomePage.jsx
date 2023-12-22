import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Contents from '../components/Contents/Contents'
import Marketing from '../components/Marketing/Marketing'
import Tabs from '../components/Tabs/Tabs'
import { useState } from 'react'
export default function Home() {
    const shoppingCartLocalStorage = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []
    const [shoppingCart, setShoppingCart] = useState(shoppingCartLocalStorage)
    const [category, setCategory] = useState('http://localhost:3000/api/1.0/products/all')
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory)
    }
    return (
        <div className='flex flex-col w-full'>
            <Header onCategoryChange={handleCategoryChange} shoppingCart={shoppingCart}/>
            <Marketing />
            <Contents category={category} />
            <Footer />
            <Tabs shoppingCart={shoppingCart}/>
        </div>
    )
}