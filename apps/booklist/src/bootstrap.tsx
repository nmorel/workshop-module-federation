import * as React from 'react'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Booklist} from './Booklist'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {QueryProvider} from 'query-provider'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Element with id "root" not found, please define one in your HTML')
}

const root = createRoot(container)
root.render(
  <StrictMode>
    <QueryProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Booklist />} />
        </Routes>
      </MemoryRouter>
    </QueryProvider>
  </StrictMode>
)
