import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

import BooklistItem from 'book/BooklistItem'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <>
      <h1 className="underline text-2xl my-4">Mes livres</h1>
      <ul className="flex flex-col gap-2">
        {booklist?.map((bookListItem, index) => (
          <li key={bookListItem.slug}>
            <BooklistItem item={bookListItem} className={index % 2 === 0 ? 'bg-slate-100' : ''} />
          </li>
        ))}
      </ul>
    </>
  )
}
export default Booklist
