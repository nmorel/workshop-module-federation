import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import cx from 'classnames'

export function BookItem({item, highlighted}: {item: Bookshelf.Book; highlighted?: boolean}) {
  const nav = useNavigate()
  return (
    <button
      type="button"
      className={cx('py-2 px-4 w-full group flex justify-between', {
        'bg-slate-100': !!highlighted,
      })}
      onClick={() => {
        nav({pathname: `/books/${item.slug}`, search: window.location.search})
      }}
    >
      <span className="group-hover:underline">{item.title}</span>
      <span className="italic text-slate-500">{item.year}</span>
    </button>
  )
}

export default BookItem
