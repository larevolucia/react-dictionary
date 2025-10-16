# React Dictionary App

A responsive **dictionary web app** built with **React**, allowing users to search for English words and view their **definitions**, **phonetics**, **synonyms**, and **related images**.
The app integrates data from the **[Free Dictionary API](https://dictionaryapi.dev/)** and **[Pexels API](https://www.pexels.com/api/)** to provide a complete learning experience.

---

## Demo

🔗 **Live Site:** [https://word-finder-app.netlify.app](https://word-finder-app.netlify.app)

---

## 🛠️ Built With

*  **React** – Component-based UI library
*  **CSS** – Custom responsive design
*  **APIs** – Free Dictionary API & Pexels API
*  **Netlify** – Deployment and serverless functions
*  **Axios / Fetch** – For API requests

---

##  Features

* Search for any English word
* View definitions, example sentences, and phonetics
* Explore related synonyms
* See relevant images from Pexels
* Responsive design for desktop and mobile
* Error handling for unavailable words or APIs

---

##  Learning Context

This project was developed as part of the **SheCodes React course** by [SheCodes.io](https://www.shecodes.io/).
It served as a hands-on learning experience in:

* Building single-page applications with React
* Managing component state and props
* Fetching and displaying API data
* Handling asynchronous operations and CORS
* Deploying with Netlify and using serverless functions

---

##  Setup and Installation

1. Clone this repository

   ```bash
   git clone https://github.com/larevolucia/react-dictionary.git
   ```
2. Navigate to the project folder

   ```bash
   cd react-dictionary
   ```
3. Install dependencies

   ```bash
   npm install
   ```
4. Run locally

   ```bash
   npm start
   ```

   or with Netlify functions:

   ```bash
   netlify dev
   ```

---

##  Environment Variables

Create a `.env` file in the project root and add your Pexels API key:

```
PEXELS_API_KEY=your_pexels_api_key_here
```

---