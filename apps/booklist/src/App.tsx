import * as React from 'react'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {Booklist} from './Booklist'

export function App() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <div className="px-8">
        <Routes>
          <Route path="/" element={<Booklist />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}
