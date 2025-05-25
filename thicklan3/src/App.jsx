import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import ProductList from './features/products/ProductList'
import { BrowserRouter } from 'react-router-dom'

function App() {
  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ProductList/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
