import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useJobStore = create((set, get) => ({
  job: [],
  isJobLoading: false,
  savedJobs: JSON.parse(localStorage.getItem("savedJobs") || "[]"),

  jobDetail: async (id) => {
    set({ isJobLoading: true });
    try {
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/job-details?job_id=${encodeURIComponent(
          id
        )}&country=in`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      set({ job: data });
    } catch (error) {
      toast.error("Error fetching job detail!");
    } finally {
      set({ isJobLoading: false });
    }
  },

  saveJob: (job) => {
    const saved = get().savedJobs;
    const exists = saved.some((j) => j?.job_id === job?.job_id);
    console.log("Job inside of saveJob: ", job);
    if (!exists) {
      const updated = [...saved, job];
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      set({ savedJobs: updated });
      toast.success("Job saved!");
    } else {
      toast("Job already saved!");
    }
  },

  removeSavedJob: (job_id) => {
    const updated = get().savedJobs.filter((j) => j?.job_id !== job_id);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    set({ savedJobs: updated });
    toast.success("Job removed!");
  },

  loadSavedJobs: () => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    console.log("SavedJob: ", saved);
    set({ savedJobs: saved });
  },
}));
