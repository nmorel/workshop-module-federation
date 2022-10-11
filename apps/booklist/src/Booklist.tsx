import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

import BookItem from 'book/BookItem'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <>
      <h1 className="underline text-2xl my-4">Mes livres</h1>
      <ul className="flex flex-col">
        {booklist?.map((bookListItem, index) => (
          <li key={bookListItem.slug}>
            <BookItem item={bookListItem} highlighted={index % 2 === 0} />
          </li>
        ))}
      </ul>
    </>
  )
}
export default Booklist
