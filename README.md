# Flood Damage Assessment App

##  Overview
This is a mobile-friendly app to collect flood damage data for chicken farms.  
It works even without internet and syncs data later.

---

##  Features
- Capture location (latitude & longitude)
- Enter Farm Name
- Enter farm address
- Select condition (Good / Moderate / Bad)
- Add number of chickens
- Upload photos
- Note
- Assessor Name
- Sync data when online

---

##  Tech Stack
**Frontend:**
- React (Vite)
- Tailwind CSS
- Ant Design
- IndexedDB (idb)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file upload)

---

## 📁 Project Structure
- `/flood` → Frontend
- `/flood-backend` → Backend

---

## ⚙️ Setup Instructions

### Step 1: Clone Repository
```bash
git clone https://github.com/DeepikaDatera/flood-damage-assessment-app.git
cd flood-damage-assessment-app
```
### Step 2: Frontend Setup
```
cd flood
npm install
npm run dev
```
### Step 3: Backend Setup
```
cd flood-backend
npm install
Create a .env file:
PORT=3000
MONGO_URI=your_mongodb_connection_string
Start the server:
npm start
```
Note:
```
App works offline using local storage (IndexedDB)
Data syncs automatically when connection is restored
```
