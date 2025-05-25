import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, fetchProducts } from "./productSlice"
import ProductCard from "../../components/ProductCard"

const ProductList = () => {
    const dispatch = useDispatch()
    const { items, message } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    };

    return (
        <div className="product-list-container">
            <div className="sucess-mess">
                {message}
            </div>

            {
                items.length === 0 ? (
                    <div className="no-product">Khong co san pham</div>
                ) : ( 
                    <div className="product-grid"> 
                        {items.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ProductList