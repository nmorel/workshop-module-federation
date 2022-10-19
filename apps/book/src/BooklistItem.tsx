import * as React from 'react'

import {Link} from 'react-router-dom'
import cx from 'classnames'

export function BooklistItem({book, index}: {book: Bookshelf.Book; index: number}) {
  return (
    <Link
      className={cx('py-2 px-4 w-full group flex justify-between', {
        'bg-slate-100': index % 2 === 0,
      })}
      to={{pathname: `/books/${book.slug}`, search: window.location.search}}
    >
      <span className="group-hover:underline">{book.title}</span>
      <span className="italic text-slate-500">{book.year}</span>
    </Link>
  )
}
