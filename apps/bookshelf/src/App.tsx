import * as React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const Book = React.lazy(() => import('book/Book'))
const Booklist = React.lazy(() => import('booklist/Booklist'))

export function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense>
              <Booklist />
            </React.Suspense>
          }
        />
        <Route
          path="/books/:slug"
          element={
            <React.Suspense>
              <Book />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  )
}
