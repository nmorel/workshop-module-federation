import * as React from 'react'
import {Navigate, useParams} from 'react-router-dom'
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
    <div className="text-center sm:text-start">
      <h1 className="text-2xl my-4">{book.title}</h1>
      <section className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-xs mx-auto sm:py-0 sm:max-w-none sm:flex-none sm:w-1/2 md:w-1/3 lg:w-1/4">
          <img src={book.cover} alt={book.title} className="" />
        </div>
        <div className="flex-1 text-justify">
          <p>{book.plot}</p>
          <p className="text-end mt-4 text-xs italic text-gray-500">
            {book.author} - {book.year}
          </p>
        </div>
      </section>
    </div>
  )
}

export default Book
