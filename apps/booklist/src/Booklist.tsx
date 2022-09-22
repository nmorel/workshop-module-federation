import * as React from 'react'
import {books} from 'api'
import {useQuery} from 'react-query'

import BookItem from 'book/BookItem'

export function Booklist() {
  const {data: booklist, isLoading} = useQuery('books', books.getAll, {initialData: []})

  if (isLoading) return null

  return (
    <ul>
      {booklist?.map((bookListItem) => (
        <li key={bookListItem.slug}>
          <BookItem item={bookListItem} />
        </li>
      ))}
    </ul>
  )
}
export default Booklist
