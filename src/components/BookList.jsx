import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function BookList({ onEdit, refreshFlag }) {
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books')
      setBooks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [refreshFlag])

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`)
      setBooks((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (!books.length)
    return <p className="text-center text-gray-500 py-8">No books found.</p>

  return (
    <div className="overflow-x-auto">
      <table 
        className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 rounded-xl shadow border-separate"
        style={{ borderSpacing: "1rem 0" }}  // 2rem horizontal, 0 vertical
      >
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr>
            <th className="px-12 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-12 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
            <th className="px-12 py-3 text-left text-sm font-semibold text-gray-700">ISBN</th>
            <th className="px-12 py-3 text-left text-sm font-semibold text-gray-700">Published Year</th>
            <th className="px-12 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-12 py-3 text-sm text-gray-800 text-left">{book.title}</td>
              <td className="px-12 py-3 text-sm text-gray-800 text-left">{book.author}</td>
              <td className="px-12 py-3 text-sm text-gray-800 text-left">{book.isbn || '-'}</td>
              <td className="px-12 py-3 text-sm text-gray-800 text-left">{book.publishedYear || '-'}</td>
              <td className="px-12 py-3 text-center space-x-2">
                <button
                  onClick={() => onEdit(book)}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}