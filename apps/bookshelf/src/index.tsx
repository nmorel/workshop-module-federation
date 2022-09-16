import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Element with id "root" not found, please define one in your HTML')
}

const root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
