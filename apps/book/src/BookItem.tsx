import * as React from 'react'
import {Link} from 'react-router-dom'

export function BookItem({item}: {item: Bookshelf.Book}) {
  return <Link to={`/books/${item.slug}`}>{item.title}</Link>
}

export default BookItem
