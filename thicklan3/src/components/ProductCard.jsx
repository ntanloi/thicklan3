import { Link } from 'react-router-dom'

const ProductCard = ({product, onDelete}) => {
    const handleDelete = () => {
        if (window.confirm('Ban co chac muon xoa?')) {
            onDelete(product.id)
        }
    }

    return (
        <div className='product-card'>
            <div className='product-images'>
                <img src={product.image} alt={product.name} />
            </div>

            <div className='product-content'>
                <div className='product-title'>
                    {product.name}
                </div>

                <div className='product-description'>
                    {product.description}
                </div>

                <div className='product-price'>
                    ${product.price}
                </div>

                <div className='product-action'>
                    <Link to={`/product/${product.id}`} className='btn btn-blue'>
                        Chi Tiết
                    </Link>

                    <Link to={`/edit/${product.id}`} className='btn btn-green'>
                        Sửa
                    </Link>

                    <button onClick={handleDelete} className='btn btn-red'>
                        Xoá
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;