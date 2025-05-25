import ProductList from "../features/products/ProductList"
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-header"> 
                <div className="home-title"> 
                    Quản lý sản phẩm
                </div>
                <Link to={"/add"} className="btn btn-blue">
                    Thêm sản phẩm
                </Link>
            </div>

            <ProductList/>
        </div>
    )
}


export default Home;