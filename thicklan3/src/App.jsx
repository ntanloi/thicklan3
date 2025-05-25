import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import ProductList from './features/products/ProductList'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
