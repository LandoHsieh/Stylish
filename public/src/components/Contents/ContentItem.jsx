import PropTypes from 'prop-types'
import '../../CSS/skeleton.css'
import { Link } from 'react-router-dom'
export default function ContentItem({ id, main_image, colors, title, price }) {
    return (
        <Link to={`/product/${id}`}>
            <div className={` overflow-hidden group flex flex-col items-center xl:items-start justify-center ${main_image ? '' : 'skeleton'}`}>
                
                <img src={main_image} className=' group-hover:scale-105 transition-transform duration-300 ease-in-out w-[213px]  h-[285px] xl:h-[480px] xl:w-[360px]' />

                <div className="flex w-[213px]">
                    {colors.length > 0 && colors.map((color, idx) => (
                        <div
                            key={idx}
                            className={`border h-5 w-5 mr-2 mt-2 mb-2`}
                            style={{ backgroundColor: `#${color.code}` }}
                        >

                        </div>
                    ))}
                </div>
                <p className=' w-[213px]'>{title}</p>
                <p className='w-[213px]'>TWD.{price}</p>
            </div>
        </Link>
    )
}

ContentItem.propTypes = {
    id: PropTypes.number.isRequired,
    main_image: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
    })),
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};