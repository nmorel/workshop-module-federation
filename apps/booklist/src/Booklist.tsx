import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

// @ts-ignore
import BooklistItem from 'book/BooklistItem'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <>
      <h1 className="underline text-2xl my-4">Mes livres</h1>
      <ul className="flex flex-col gap-2">
        {booklist?.map((bookListItem) => (
          <li key={bookListItem.slug}>
            <BooklistItem item={bookListItem} />
          </li>
        ))}
      </ul>
    </>
  )
}
export default Booklist
