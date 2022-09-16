import {Item} from './Item'

export function List() {
  // TODO add react-query and call to API ?
  const list: Bookshelf.Book[] = [{slug: 'test', title: 'Test'} as any]
  return (
    <ul>
      {list.map((item) => (
        <li key={item.slug}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  )
}
