import * as React from 'react'

import {Link} from 'react-router-dom'
import cx from 'classnames'

export function BooklistItem({item, className = ''}: {item: Bookshelf.Book; className?: string}) {
  return (
    <Link
      className={cx('py-2 px-4 w-full group flex justify-between', className)}
      to={{pathname: `/books/${item.slug}`, search: window.location.search}}
    >
      <span className="group-hover:underline">{item.title}</span>
    </Link>
  )
}
