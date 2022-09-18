import books from './data/books.json'

export default {
  getAll(): Bookshelf.Book[] {
    return books
  },
  get(id: string): Bookshelf.Book | null {
    return books.find((book) => id === book.id) || null
  },
  findBySlug(slug: string): Bookshelf.Book | null {
    return books.find((book) => slug === book.slug) || null
  },
}
