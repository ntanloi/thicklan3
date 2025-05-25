import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, Link } from "react-router-dom"
import { deleteProduct, fetchProductById } from "../features/products/productSlice"

const ProductDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentProduct } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    const handleDelete = () => {
        if (window.confirm("Ban co chac chan muon xoa"))
        {
            dispatch(deleteProduct(id)).then(() => {
                navigate('/')
            })
        }
    }

    if (!currentProduct) {
        return (
            <div className="container">
                <p>Khong tim thay san pham</p>
                <Link to={'/'} className="btn btn-blue">Quay lai</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <Link to={'/'} className="btn btn-blue">Quay Lại</Link>
            <br /> <br />
            <div className="card">
                <div className="card-body">
                    <div className="card-image">
                        <img src={currentProduct.image} alt={currentProduct.name} />
                    </div>

                    <div className="product-info">
                        <div className="product-title">
                            {currentProduct.name}
                        </div>
                        <div className="product-description">
                            <h2>Mô Tả</h2>
                            {currentProduct.description}
                        </div>

                        <div className="product-price">
                            ${currentProduct.price}
                        </div>

                        <div className="button-group">
                            <Link to={`/edit/${currentProduct.id}`} className="btn btn-green">Sửa</Link>
                            <button onClick={handleDelete} className="btn btn-red">
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail