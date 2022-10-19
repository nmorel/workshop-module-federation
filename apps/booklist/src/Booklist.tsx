import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

import {BooklistItem} from './BooklistItem'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <>
      <h1 className="underline text-2xl my-4">Livres</h1>
      <ul className="flex flex-col">
        {booklist?.map((bookListItem) => (
          <li key={bookListItem.slug}>
            <BooklistItem item={bookListItem} className="hover:underline" />
          </li>
        ))}
      </ul>
    </>
  )
}
export default Booklist
