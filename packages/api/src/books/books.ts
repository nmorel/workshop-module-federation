import books from './data/books.json'

export default {
  getAll(): Bookshelf.Book[] {
    return books
  },
  get(id: string): Bookshelf.Book {
    return books.find((book) => id === book.id)
  },
}
