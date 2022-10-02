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
        <section className="flex flex-col sm:flex-row max-w-5xl mx-auto px-8">
          <div className="flex-1 max-w-xs p-4 mx-auto sm:py-0 sm:max-w-none sm:flex-none sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img src={book.cover} alt={book.title} className="" />
          </div>
          <div className="flex-1 text-justify">{book.plot}</div>
        </section>
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
