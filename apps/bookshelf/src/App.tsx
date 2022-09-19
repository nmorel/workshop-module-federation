import * as React from 'react'
import Book from 'book/Book'
import Booklist from 'booklist/Booklist'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Booklist />} />
        <Route path="/books/:slug" element={<Book />} />
      </Routes>
    </Router>
  )
}
