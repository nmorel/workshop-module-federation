import books from './data'

function waitRequest() {
  return new Promise((_) => setTimeout(_, 20 + Math.floor(Math.random() * 80)))
}

export default {
  async getAll(): Promise<Bookshelf.Book[]> {
    await waitRequest()
    return books
  },
  async getById(id: string): Promise<Bookshelf.Book | null> {
    await waitRequest()
    return books.find((book) => id === book.id) || null
  },
  async getBySlug(slug: string): Promise<Bookshelf.Book | null> {
    await waitRequest()
    return books.find((book) => slug === book.slug) || null
  },
}
