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
    <>
      <h1>{book.title}</h1>
    </>
  )
}

export default Book
