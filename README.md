# 🧙 Nodejs – 2‑Tier Full‑Stack Application

A modern, stylish **task manager** with a **magic spell‑casting theme** – built as a two‑tier web application.  
The frontend (React) communicates with a backend (Node.js + Express) that stores tasks in memory.  
Designed for easy deployment on two separate VMs (or local machines) with Nginx reverse proxy and systemd.

---

## 🏗️ Architecture
<img width="501" height="185" alt="image" src="https://github.com/user-attachments/assets/404363f2-9313-4b49-87bc-a9db8a73ed9c" />



- **Frontend (VM1)**: React application served by Nginx. All API calls are proxied to the backend VM.
- **Backend (VM2)**: Node.js + Express REST API. Data is stored in memory (volatile, for demo/development).
- **Communication**: HTTP over private network. CORS enabled.

---

## 🚀 Features

- ✨ **Modern glassmorphism UI** – soft gradients, rounded cards, smooth animations.
- ⚡ **Real‑time task status** – mark tasks as `PENDING` / `EXECUTED` (completed).
- 🧙 **Magic spell theme** – tasks are called “spells”, adding a playful console vibe.
- 🔁 **RESTful API** – full CRUD operations (Create, Read, Update, Delete).
- 🐳 **Docker‑ready** – both frontend and backend can be containerised (optional).
- 🔒 **Systemd integration** – auto‑start and restart on VM boot.

---

## 🛠️ Technologies Used

| Component       | Technology                                 |
|----------------|--------------------------------------------|
| Frontend       | React, Axios, Styled‑Components, FontAwesome |
| Backend        | Node.js, Express, CORS                     |
| Web Server     | Nginx (reverse proxy for frontend)         |
| Process Manager| systemd                                    |
| Firewall       | UFW                                        |
| OS             | Ubuntu / Debian (or any Linux)             |

---

## 📦 Deployment Guide (Two Separate VMs)

### Prerequisites
- Two Linux VMs (or machines) with **Ubuntu 20.04+**.
- **Frontend VM IP** – will be the public access point.
- **Backend VM IP** (e.g., `192.168.29.38`) – known in advance.
- Both VMs have internet access to install packages.

---

## Quick Start


---



## 🚀Frontend VM Build & serve with Nginx (production)

### 1. Install Nginx and Node.js 
```bash
sudo apt update
sudo apt install -y nginx curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Build the React app
```bash
cd /path/to/nodejs-2tier/frontend
npm install
npm run build
```
This creates a `build/` directory with static files.

### 3. Copy the build to Nginx web root
```bash
sudo rm -rf /var/www/html/*
sudo cp -r build/* /var/www/html/
```

### 4. Configure Nginx as reverse proxy (to forward `/api` to your backend)
Create a new Nginx configuration file:
```bash
sudo tee /etc/nginx/sites-available/magic-hub-frontend > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://<BACKEND_IP>:5000;   # Replace with actual backend IP
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```
**Important**: Replace `<BACKEND_IP>` with the actual IP address of your backend VM (e.g., `192.168.29.38`).

### 5. Enable the site and restart Nginx
```bash
sudo ln -sf /etc/nginx/sites-available/magic-hub-frontend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

### 6. Allow HTTP in firewall (if enabled)
```bash
sudo ufw allow 80/tcp
```

### 7. Access the frontend
Open a browser and go to `http://<frontend-vm-ip>`.  
You should see the **Server Magic Input Hub** UI.

