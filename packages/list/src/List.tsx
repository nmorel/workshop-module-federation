import {Item} from './Item'

export function List() {
  // TODO add react-query and call to API ?
  const list = [{slug: 'test', title: 'Test'}]
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
