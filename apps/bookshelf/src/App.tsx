import * as React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

const Book = React.lazy(() => import('book/Book'))
const Booklist = React.lazy(() => import('booklist/Booklist'))

export function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <header className="px-4 sm:px-8 md:px-16 flex justify-center items-center h-12 bg-red-400">
          <div className="max-w-5xl text-white flex-1">
            <Link to={{pathname: '/', search: window.location.search}}>
              <h1 className="text-3xl font-serif">Bookshelf</h1>
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto flex flex-col">
          <main className="px-4 sm:px-8 md:px-16 flex justify-center flex-1">
            <div className="max-w-5xl relative flex-1">
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
            </div>
          </main>
          <footer className="p-4 sm:px-8 md:px-16 flex justify-center items-center h-10">
            <div className="text-[0.6rem]">
              <a href="https://devfest.gdgnantes.com/" target="_blank" rel="noopener noreferrer">
                Made for DevFest Nantes 2022
              </a>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  )
}
