import {Book} from 'book'
import List from 'list/List'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/books/:slug" element={<Book />} />
      </Routes>
    </Router>
  )
}
