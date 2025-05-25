# Books UI

A React + Vite single‑page application for managing your book collection.  
The app talks to the Books API and lets you create, edit and delete titles — all behind a tidy HTTPS setup.

**Live demo → <https://books.zenflixapp.online>**

---

## Features

- **Add / Edit / Delete** books (title, author, ISBN, year)
- **Table view** with responsive layout
- **Instant form validation** (client‑side)
- **Custom favicon & title** (`Books App`)
- **HTTPS‑only** deployment with free Let’s Encrypt certs

---

## Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Front‑end | [React 18](https://react.dev) + [Vite](https://vitejs.dev) | ultra‑fast HMR |
| Styling  | [Tailwind CSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com) | utility + component library |
| HTTP     | [Axios](https://axios-http.com) | REST client |
| Dev ops  | Docker multi‑stage → Nginx → EC2 | script `deploy‑ui.sh` |
| TLS      | Nginx + Certbot (Let’s Encrypt) | auto‑renew |

---

## Getting Started (Local dev)

### Prerequisites
* Node 18 or later
* npm

```bash
git clone https://github.com/<your‑handle>/books-ui.git
cd books-ui
npm install
npm run dev      # visit http://localhost:5173
```

---

## Running with Docker (optional)

```bash
docker build -t books-ui .
docker run -p 5173:80 books-ui
```

---

## Production Deploy

The repo includes **deploy‑ui.sh** — a one‑liner that:

1. Builds & pushes `kathirganesan/books-ui:<git‑sha>`  
2. SSHes to EC2 (`13.201.250.57`) and swaps the container on port **8081**  
3. Host‑level Nginx proxies → `https://books.zenflixapp.online`

```bash
./deploy-ui.sh                 # requires DOCKERHUB_USER & SSH key
```

_Back‑end deploy lives in `deploy-api.sh` and exposes the API at  
<https://booksapi.zenflixapp.online/api/>._

---

## Folder Structure

```
books-ui/
├─ public/
│  ├─ favicon.png
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ BookForm.jsx
│  │  └─ BookList.jsx
│  ├─ App.jsx
│  └─ index.css
├─ deploy-ui.sh
└─ Dockerfile
```

---

## API

During development the Vite proxy redirects `/api/**` to  
`http://localhost:8080`.  
In production the host Nginx forwards the same path to the Spring Boot
container on port 8080.

---

## Contributing

Pull requests are welcome — please open an issue first to discuss major changes.

---

## License

[MIT](LICENSE)