declare namespace Bookshelf {
  type Book = {
    id: string
    slug: string
    title: string
    year: number
    author: string
    plot: string
    cover: string
  }
}

declare module '*.jpeg' {
  const value: string
  export default value
}
