import {Link} from 'react-router-dom'

export function Item({item}: {item: Bookshelf.Book}) {
  return <Link to={`/books/${item.slug}`}>{item.title}</Link>
}
