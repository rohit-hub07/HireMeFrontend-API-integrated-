## Deployed Link:- https://hire-me-frontend-api-integrated.vercel.app/

# HireMe

This is the frontend for **HireMe**, a job search and job saving web application built with React, Zustand, React Router, and Tailwind CSS.

## Features

- 🔍 **Job Search:** Search for jobs using keywords and filters (employment type, date, location).
- 💾 **Save Jobs:** Save jobs to your local storage for later viewing.
- 🗑️ **Remove Saved Jobs:** Remove jobs you no longer want to keep.
- 🌙 **Dark Mode:** Toggle between light and dark themes.
- 📱 **Responsive:** Works well on desktop and mobile devices.

## Tech Stack

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   - Copy your RapidAPI key into `.env` as `VITE_RAPID_API=your_key_here`.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
src/
  components/    # Reusable UI components (Navbar, JobCard)
  layout/        # Layout wrapper with Navbar and Outlet
  pages/         # Main pages (HomePage, JobDetail, SavedJobs)
  store/         # Zustand store for global state
  App.jsx        # Main app with routes
  main.jsx       # Entry point
  index.css      # Tailwind base styles
```

## Customization

- **Change Avatar:** Replace the avatar image URL in `Navbar.jsx`.
- **Change Theme Colors:** Edit `tailwind.config.js` for custom colors.
- **API:** Uses [jsearch.p.rapidapi.com](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch/) for job data.

## License

This project is for educational/demo
