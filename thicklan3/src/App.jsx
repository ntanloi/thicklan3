import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import ProductList from './features/products/ProductList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AddProduct from './pages/AddProduct'

function App() {
  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product/:id' element={<ProductDetail/>}></Route>
          <Route path='/add' element={<AddProduct/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
