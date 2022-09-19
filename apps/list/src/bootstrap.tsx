import * as React from 'react'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {List} from './List'
import {MemoryRouter, Routes, Route} from 'react-router-dom'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Element with id "root" not found, please define one in your HTML')
}

const root = createRoot(container)
root.render(
  <StrictMode>
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </MemoryRouter>
  </StrictMode>
)
