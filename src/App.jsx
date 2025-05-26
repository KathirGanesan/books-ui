import React, { useState } from 'react'
import axios from 'axios'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

export default function App() {
  const [editingBook, setEditingBook] = useState(null)
  const [refreshFlag, setRefreshFlag] = useState(false)

  // Callback to set editing book from BookList
  const handleEdit = (book) => {
    setEditingBook(book)
  }

  // Callback after a successful update so we can clear editing mode
  const handleFormSubmit = () => {
    setEditingBook(null)
    setRefreshFlag((f) => !f) // trigger a refresh in BookList if needed
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const payload = { title: form.title, author: form.author }
    if (form.isbn) payload.isbn = form.isbn
    if (form.publishedYear) payload.publishedYear = +form.publishedYear
    try {
      // Assume currentBook holds the book being edited
      const res = await axios.patch(`/api/books/${currentBook.id}`, payload)
      // Then refresh your list accordingly...
    } catch (err) {
      console.error('Error updating book:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 w-full z-10">
        <div className="w-full px-2 sm:px-4 lg:px-8 py-4 mx-0">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-4 sm:mb-6">
            📚 My Book Collection
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-12 px-0 sm:px-4 lg:px-8 w-full mx-0">
        <div className="w-full sm:max-w-4xl mx-auto space-y-8 sm:space-y-12 px-0">
          <div className="mx-auto max-w-md w-full">
            <BookForm editingBook={editingBook} onSubmitSuccess={handleFormSubmit} />
          </div>
          <BookList onEdit={handleEdit} refreshFlag={refreshFlag} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-auto w-full mx-0">
        <div className="w-full px-2 sm:px-4 lg:px-8 py-4 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mx-0">
          <div className="mb-2">
            {/* Source code links */}
            <code>
              source code: <a href="https://github.com/KathirGanesan/books-api" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline mx-1 sm:mx-2">books-api</a>
              |
              <a href="https://github.com/KathirGanesan/books-ui" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline mx-1 sm:mx-2">books-ui</a>
            </code>
          </div>
          &copy; {new Date().getFullYear()} Books App
        </div>
      </footer>
    </div>
  )
}