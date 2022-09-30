import * as React from 'react'
import {Link, Navigate, useParams} from 'react-router-dom'
import {books} from 'api'
import {useQuery} from 'react-query'

export function Book() {
  const {slug} = useParams()

  const {data: book, isLoading} = useQuery(
    ['book', slug],
    () => {
      if (!slug) return
      return books.getBySlug(slug)
    },
    {enabled: !!slug}
  )

  if (isLoading) return null

  if (!book) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <>
      <div className="text-center">
        <h1 className="underline text-2xl mx-8 my-4">{book.title}</h1>
      </div>
      <div className="absolute top-2 left-2 bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center">
        <Link className="text-xs" to="/">
          🏠
        </Link>
      </div>
    </>
  )
}

export default Book
