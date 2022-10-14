import * as React from 'react'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Book} from './Book'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {QueryProvider} from 'query-provider'
import {books} from 'api'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Element with id "root" not found, please define one in your HTML')
}

const [firstBook] = await books.getAll()

const root = createRoot(container)
root.render(
  <StrictMode>
    <QueryProvider>
      <MemoryRouter initialEntries={[`/books/${firstBook.slug}`]}>
        <div className="px-8">
          <Routes>
            <Route path="/books/:slug" element={<Book />} />
          </Routes>
        </div>
      </MemoryRouter>
    </QueryProvider>
  </StrictMode>
)
