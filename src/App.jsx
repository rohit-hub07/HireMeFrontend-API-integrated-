import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import  Layout  from "./layout/Layout"
import JobDetail from "./pages/JobDetail";
import SavedJobs from "./pages/SavedJobs";

function App() {

  return (
    <>
      <Toaster />
      <Routes >

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobdetail/:id" element={<JobDetail />} />
          <Route path="/saved" element={<SavedJobs />} />

        </Route>

      </Routes>
      
    </>
  );
}

export default App;
