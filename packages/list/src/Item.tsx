import {Link} from 'react-router-dom'

export function Item({item}: {item: any}) {
  return <Link to={`/books/${item.slug}`}>{item.title}</Link>
}
