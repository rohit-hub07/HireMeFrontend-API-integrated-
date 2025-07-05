

import React, { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import JobCard from "../components/JobCard";

const SavedJobs = () => {
  const { savedJobs, loadSavedJobs, removeSavedJob } = useJobStore();

  useEffect(() => {
    loadSavedJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-8 sm:mt-10 dark:bg-gray-950">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-500 dark:text-white">No saved jobs.</p>
      ) : (
        <>
          {savedJobs.map((job, idx) => (
            <div key={job?.job_id ?? idx} className="relative">
              <JobCard job={job} />
              <button
                className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1 px-2 sm:px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs sm:text-sm shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => removeSavedJob(job?.job_id)}
                title="Remove from saved"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SavedJobs;