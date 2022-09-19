import * as React from 'react'
import {Item} from './Item'
import {books} from 'api'

export function List() {
  const list: Bookshelf.Book[] = books.getAll()
  return (
    <ul>
      {list.map((item) => (
        <li key={item.slug}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  )
}
export default List
