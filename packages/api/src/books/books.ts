import books from './data/books.json'

export default {
  async getAll(): Promise<Bookshelf.Book[]> {
    await new Promise((_) => setTimeout(_, 500))
    return books
  },
  async getById(id: string): Promise<Bookshelf.Book | null> {
    await new Promise((_) => setTimeout(_, 500))
    return books.find((book) => id === book.id) || null
  },
  async getBySlug(slug: string): Promise<Bookshelf.Book | null> {
    await new Promise((_) => setTimeout(_, 500))
    return books.find((book) => slug === book.slug) || null
  },
}
