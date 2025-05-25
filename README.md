# Books UI

A simple React-based user interface for managing a book collection. This app allows you to add, update, and delete book records using a backend API.

## Features

- **Add a New Book:** Enter title, author, ISBN, and published year.
- **Edit an Existing Book:** Update selected book details.
- **Delete a Book:** Remove a book from the list.
- **Responsive Layout:** Built with Tailwind CSS and DaisyUI for a modern UI.
- **Table View:** Displays book records in a well-spaced table.

## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/books-ui.git
   cd books-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) If you need to set up Tailwind CSS configuration:

   ```bash
   npx tailwindcss init -p
   ```

### Running the App

You can start the development server by running:

```bash
npm run dev
```

Then, open your browser to [http://localhost:5173](http://localhost:5173) (or as indicated in the terminal).

### Build for Production

To build the app for production:

```bash
npm run build
```

Preview the production build by running:

```bash
npm run preview
```

## Folder Structure

```
books-ui/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BookForm.jsx
│   │   └── BookList.jsx
│   ├── index.css
│   └── App.jsx
├── package.json
├── README.md
└── vite.config.js
```

## API

This app communicates with a backend API. Make sure your backend server is running and accessible at `/api/books`. Update your proxy configuration in `vite.config.js` if needed.

## Contributing

Contributions are welcome! Feel free to open issues or create pull requests.

## License

[MIT](LICENSE)
