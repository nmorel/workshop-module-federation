import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {List} from './List'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Element with id "root" not found, please define one in your HTML')
}

const root = createRoot(container)
root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </Router>
  </StrictMode>
)
