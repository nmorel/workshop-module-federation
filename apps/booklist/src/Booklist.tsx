import * as React from 'react'
import {Item} from './Item'
import {books} from 'api'
import {useQuery} from 'react-query'

export function Booklist() {
  const {data: booklist} = useQuery('books', books.getAll, {initialData: []})

  return (
    <ul>
      {booklist?.map((bookListItem) => (
        <li key={bookListItem.slug}>
          <Item item={bookListItem} />
        </li>
      ))}
    </ul>
  )
}
export default Booklist
