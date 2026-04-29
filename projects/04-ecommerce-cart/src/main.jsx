import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FiltersProvider } from './context/filters-context.jsx'
import { CartProvider } from './context/cart-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </CartProvider>
  </StrictMode>,
)
