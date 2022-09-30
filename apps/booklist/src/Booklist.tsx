import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

import BookItem from 'book/BookItem'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <div className="text-center">
      <h1 className="underline text-2xl my-4">Mes livres</h1>
      <ul className="flex flex-col gap-2">
        {booklist?.map((bookListItem) => (
          <li key={bookListItem.slug}>
            <BookItem item={bookListItem} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Booklist
