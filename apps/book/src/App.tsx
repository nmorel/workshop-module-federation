import {books} from 'api'
import * as React from 'react'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {Book} from './Book'

const [defaultBook] = await books.getAll()

export function App() {
  return (
    <MemoryRouter initialEntries={[`/books/${defaultBook.slug}`]}>
      <div className="px-8">
        <Routes>
          <Route path="/books/:slug" element={<Book />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}
