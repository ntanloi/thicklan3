import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProductById, updateProduct } from "../features/products/productSlice"
import { useEffect } from "react"

const EditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentProduct } = useSelector(state => state.products)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    })

    const availableImages = [
        {value: '', label: "Khong co hinh anh"},
        {value: '/images/laptop.png', label: 'lap top'},
        {value: '/images/ssgalaxy.png', label: 'sam sung ga la xy'},
        {value: '/images/arriport.png', label: 'e pot'},
    ]

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const productData = {
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            description: formData.description.trim(),
            image: formData.image.trim()
        }

        try {
            await dispatch(updateProduct({id, productData})).unwrap()
            navigate('/')
        } catch (error)
        {
            console.error("Fail")
        }
    }

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (currentProduct) {
            setFormData({
                name: currentProduct.name || '',
                price: currentProduct.price || '',
                description: currentProduct.description || '',
                image: currentProduct.image || '',
            })
        }
    }, [currentProduct])

    return (
        <div className="add-product-container">
            <div className="back-link">
                <Link to={'/'} className="btn btn-blue">Quay Lại</Link>
            </div>

            <div className="form">
                <h1>Sua San Pham</h1>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="name">Ten SP</label>
                        <input type="text" name="name" id="name"
                        placeholder="Nhap ten sp"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="number">Gia</label>
                        <input type="number" name="price" id="price"
                        min={'0'}
                        step={'0,01'}
                        placeholder="Nhap gia"
                        value={formData.price}
                        onChange={handleChange}
                        required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Mo Ta</label>
                        <textarea 
                        name="description" id="description"
                        placeholder="Nhap mo ta"
                        value={formData.description}
                        onChange={handleChange}
                        required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Mo Ta</label>
                        <select name="image" id="image"
                        value={formData.image}
                        onChange={handleChange}>
                            {
                                availableImages.map(imageOption => (
                                    <option key={imageOption.value}
                                    value={imageOption.value}>
                                        {imageOption.label}
                                    </option>
                                ))  
                            }
                        </select>
                        {formData.image && (
                            <div className="image-review">
                                <p>Xem truoc</p>
                                <div className="image-box">
                                    <img src={formData.image}/>
                                </div>
                            </div>
                        )}

                        <div className="button-group">
                            <button type="submit" className="btn btn-blue">
                                Sua sản phẩm
                            </button>
                            <Link to={`/`} className="btn btn-red">Huỷ</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}