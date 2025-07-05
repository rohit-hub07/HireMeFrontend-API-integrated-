import React, { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import JobCard from "../components/JobCard";

const SavedJobs = () => {
  const { savedJobs, loadSavedJobs, removeSavedJob } = useJobStore();

  useEffect(() => {
    loadSavedJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10  dark:bg-gray-950">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-white">No saved jobs.</p>
      ) : (
        <>
          {savedJobs.map((job, idx) => (
            <div key={job?.job_id ?? idx} className="relative">
              <JobCard job={job} />
              <button
                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeSavedJob(job?.job_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SavedJobs;
