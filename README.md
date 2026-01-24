Nice work, Mahesh 👏
Your project looks **clean, feature-rich, and very presentable**. Based on:

* your **GitHub repo structure**
* the **live deployment**
* the **updated UI (categories, cards, search)**
* **no map integration**
* and that you’ll **provide a demo video**

Here’s a **production-ready README.md** you can directly paste into your repo.

---

## 🌍 Wanderlust – Airbnb-like Property Listing Platform

Wanderlust is a full-stack web application inspired by Airbnb that allows users to explore, list, and review properties across India. The platform supports authentication, image uploads, category-based filtering, and user-generated reviews, all deployed on a cloud infrastructure.

🔗 **Live Demo:**
[https://wanderlust-r3ap.onrender.com/listings](https://wanderlust-r3ap.onrender.com/listings)

## 🎥 Project Demo Video

Watch the full project walkthrough here:  
👉 [Click to watch demo video](https://drive.google.com/file/d/1sG5mViQ_SaDBvgYB8FpsVB3tXJzDpM7a/view)


---

## 🚀 Features

### 👤 User Features

* User authentication (Sign up / Login / Logout)
* Browse properties by categories:

  * Trending
  * Rooms
  * Mountains
  * Iconic Cities
  * Child Care
  * Family
  * Farm
  * Arctic
  * Boats
  * Hiking
  * Adventure
  * Pub
* Search listings by city
* View listing details with images
* Add reviews and ratings
* Flash messages for actions (success/error)

### 🏠 Property Management

* Create new property listings
* Upload images using Cloudinary
* Edit and delete own listings
* Authorization checks (only owners can edit/delete)

### ⭐ Reviews

* Add reviews to listings
* Delete own reviews
* Rating system

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication & Security

* Passport.js
* Passport-Local
* Passport-Local-Mongoose
* Express-Session
* Connect-Flash
* Joi (server-side validation)

### Cloud & Deployment

* MongoDB Atlas (Cloud Database)
* Cloudinary (Image Storage)
* Render (Deployment)

---

## 📁 Project Structure

```
wanderlust/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── error.ejs
│
├── public/
│   ├── css/
│   ├── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── middleware.js
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret
NODE_ENV=production
SECRET=your_session_secret

MONGO_URI_LOCAL=mongodb:non-srv link
MONGO_URI_PROD=mongodb+srv://username:<password>@cluster0.r2qwhv8.mongodb.net/?appName=Cluster0
```

---

## ▶️ Run Locally

```bash
git clone https://github.com/MaheshKuleppanavar/wanderlust.git
cd wanderlust
npm install
nodemon app.js
```

Open in browser:
`http://localhost:8080/listings`

---

## 🌐 Deployment Notes

* The project is deployed on **Render**
* MongoDB Atlas **SRV connection** is used in production
* Local environment may fail to resolve SRV DNS on some networks, but deployment works correctly
* No build command is required for this Express app

---

## 🔮 Future Enhancements

* Map-based property visualization
* Booking & availability calendar
* Payment gateway integration
* Admin dashboard
* Wishlist / favorites
* Pagination & advanced filters

---

## 👨‍💻 Author

**Mahesh Kudleppanavar**
BCA Graduate | Web Developer
GitHub: [https://github.com/MaheshKuleppanavar](https://github.com/MaheshKuleppanavar)

---

