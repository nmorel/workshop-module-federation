import * as React from 'react'

import {Link} from 'react-router-dom'

export function BooklistItem({item}: {item: Bookshelf.Book}) {
  return (
    <Link
      className="hover:underline"
      to={{pathname: `/books/${item.slug}`, search: window.location.search}}
    >
      {item.title}
    </Link>
  )
}

export default BooklistItem
