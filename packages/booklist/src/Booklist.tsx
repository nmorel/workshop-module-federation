import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

import {Link} from 'react-router-dom'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <>
      <h1 className="underline text-2xl my-4">Mes livres</h1>
      <ul className="flex flex-col gap-2">
        {booklist?.map((bookListItem) => (
          <li key={bookListItem.slug}>
            <Link
              className="hover:underline"
              to={{pathname: `/books/${bookListItem.slug}`, search: window.location.search}}
            >
              {bookListItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default Booklist
