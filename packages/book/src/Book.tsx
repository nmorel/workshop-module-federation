import {useParams} from 'react-router-dom'

export function Book() {
  const {slug} = useParams()
  // TODO react-query and call api
  const book = {
    slug,
    title: slug
      ?.split('-')
      .map((word) => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join(' '),
  }
  return (
    <>
      <h1>{book.title}</h1>
    </>
  )
}
