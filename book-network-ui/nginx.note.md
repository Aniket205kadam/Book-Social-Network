# How NGINX Works with a Frontend App
### 1. Frontend App is Deployed on a Server with NGINX

Your React app is built (npm run build or yarn build).
The generated static files (index.html, .js, .css) are placed inside NGINX's root folder (/usr/share/nginx/html).
This server (with NGINX) is where users will request the frontend.
### 2. User Requests the Frontend

When a user visits app.com, the request goes to NGINX.
NGINX serves the static React files from /usr/share/nginx/html.
### 3. Browser Loads React App & Makes API Calls

The browser downloads & runs React JS files.
If the React app needs data, it makes API calls to the backend server.
These API calls go to another server (e.g., a Spring Boot backend).
### 3. NGINX Can Also Proxy API Requests (Optional)

If your backend is on another server (api.app.com), NGINX can forward API requests from app.com/api to api.app.com.
This avoids CORS issues and simplifies frontend-backend communication.
## Final Setup:
✅ Frontend (React + NGINX) is on one server <br /> 
✅ Backend (Spring Boot, etc.) is on another server <br />
✅ User requests the frontend → NGINX serves React static files <br />
✅ React runs in the browser and makes API calls to the backend <br />

So yes, NGINX takes responsibility for serving the frontend and optionally helps route API requests to the backend. 🚀