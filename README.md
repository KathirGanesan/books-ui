# 📘 Books UI

An intuitive and user-friendly frontend built to interact with the Books API. Developed using React and Tailwind CSS, this UI allows users to manage book records effortlessly through a responsive and visually appealing interface.

## 🌟 Features

* **CRUD Operations**: Seamlessly create, view, update, and delete books.
* **Responsive Design**: Optimized for desktop and mobile devices.
* **Interactive UI**: Smooth interactions and real-time feedback.
* **Form Validation**: Ensures correct and complete data entry.
* **Integration**: Fully integrated with the Books REST API.

## ⚙️ Tech Stack

* React
* Tailwind CSS
* Axios for API calls
* React Router
* Vite for build tooling
* Docker for containerization

## 📂 Project Structure

```
books-ui
├── src
│   ├── components
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   │   └── Navbar.jsx
│   ├── pages
│   │   ├── HomePage.jsx
│   │   └── BookDetailsPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public
│   └── index.html
├── Dockerfile
├── deploy-ui.sh
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/books-ui.git
cd books-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Your UI will run at `http://localhost:5173`.

## 🐳 Docker Containerization and Deployment

Deployment is automated through the provided `deploy-ui.sh` script, which handles building, pushing to Docker Hub, and deploying via SSH to a remote server.

### Deployment Steps

Set your environment variables appropriately or update them directly in `deploy-ui.sh`:

```bash
export DOCKERHUB_USER="your_dockerhub_username"
export TAG="your_image_tag"
export REMOTE_HOST="ssh_user@remote_host_ip"
```

Then execute:

```bash
bash deploy-ui.sh
```

The script performs the following:

* Builds and tags the Docker image
* Pushes the image to Docker Hub
* Connects via SSH to the remote server
* Pulls the latest Docker image
* Stops and removes any existing containers
* Runs the new container on port 8081

## 🌐 API Integration

The UI integrates seamlessly with the Books API deployed at:

```
https://books.zenflixapp.online
```

## 🤝 Contributions

Your contributions and feedback are warmly welcomed! Open an issue or submit a pull request to contribute.

---

⭐ If this project helped you, consider starring the repository!
