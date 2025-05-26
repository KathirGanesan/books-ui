import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function BookForm({ editingBook, onSubmitSuccess }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: ''
  })

  // If editingBook changes, update state to pre-fill the form.
  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        isbn: editingBook.isbn || '',
        publishedYear: editingBook.publishedYear || ''
      })
    } else {
      setForm({ title: '', author: '', isbn: '', publishedYear: '' })
    }
  }, [editingBook])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return

    const payload = { title: form.title, author: form.author }
    if (form.isbn) payload.isbn = form.isbn
    if (form.publishedYear) payload.publishedYear = +form.publishedYear

    try {
      if (editingBook) {
        // Update using PATCH if editing
        await axios.patch(`/api/books/${editingBook.id}`, payload)
      } else {
        // Otherwise create new using POST
        await axios.post('/api/books', payload)
      }
      // Clear the form and notify parent for a refresh.
      setForm({ title: '', author: '', isbn: '', publishedYear: '' })
      if (onSubmitSuccess) onSubmitSuccess()
    } catch (err) {
      console.error('Error submitting book:', err)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
        {editingBook ? 'Edit Book' : 'Add a New Book'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter the title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            placeholder="Enter the author"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            placeholder="Enter the ISBN"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Published Year
          </label>
          <input
            type="number"
            name="publishedYear"
            value={form.publishedYear}
            onChange={handleChange}
            placeholder="Enter the published year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <div className="md:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  )
}