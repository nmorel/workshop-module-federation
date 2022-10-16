import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import cx from 'classnames'

export function BooklistItem({item, className = ''}: {item: Bookshelf.Book; className?: string}) {
  const nav = useNavigate()
  return (
    <button
      type="button"
      className={cx('py-2 px-4 w-full group flex justify-between', className)}
      onClick={() => {
        nav({pathname: `/books/${item.slug}`, search: window.location.search})
      }}
    >
      <span className="group-hover:underline">{item.title}</span>
    </button>
  )
}
