import * as React from 'react'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import {Booklist} from './Booklist'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {QueryProvider} from 'query-provider'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Element with id "root" not found, please define one in your HTML')
}

ReactDOM.render(
  <StrictMode>
    <QueryProvider>
      <MemoryRouter initialEntries={['/']}>
        <div className="px-8">
          <Routes>
            <Route path="/" element={<Booklist />} />
          </Routes>
        </div>
      </MemoryRouter>
    </QueryProvider>
  </StrictMode>,
  container
)
