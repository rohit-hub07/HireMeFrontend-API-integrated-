import React, { useEffect } from "react";
import {
  ArrowRight,
  Bookmark,
  ClipboardList,
  ListChecks,
  LoaderCircle,
} from "lucide-react";
import { useJobStore } from "../store/useJobStore";
import { Link, useParams } from "react-router-dom";

const JobDetail = () => {
  const { job, isJobLoading, jobDetail, saveJob } = useJobStore();
  const id = useParams();
  useEffect(() => {
    if (id) jobDetail(id);
  }, [id]);

  if (isJobLoading) {
    return (
      <div className="flex justify-center py-10">
        <LoaderCircle className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!job) {
    return <p className="text-center text-gray-600">No job data available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen mt-20  dark:bg-gray-950">
      {job.data?.map((job) => (
        <div key={job.job_id}>
          <div className="text-sm text-gray-500 mb-6">
            Home / {job.job_title}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
            {job.job_title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {job.employer_name} &middot; {job.job_city}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            {job.job_description?.split(" ").slice(0, 30).join(" ")}
            {job.job_description?.split(" ").length > 30 ? "..." : ""}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Responsibilities
            </h2>
            <div className="space-y-4">
              {Array.isArray(job.job_highlights?.Responsibilities) ? (
                job.job_highlights.Responsibilities?.slice(0, 5).map(
                  (item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                      </div>
                      <span className="ml-3 text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  )
                )
              ) : (
                <span className="text-gray-400 italic">
                  No responsibilities listed.
                </span>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Requirements
            </h2>
            <div className="space-y-4">
              {Array.isArray(job.job_highlights?.Qualifications) &&
              job.job_highlights.Qualifications.length > 0 ? (
                job.job_highlights.Qualifications.slice(0, 5).map(
                  (item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                      </div>
                      <span className="ml-3 text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  )
                )
              ) : (
                <span className="text-gray-400 italic">
                  No qualifications listed.
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Apply Now
            </a>
            <button
              className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => saveJob(job)}
            >
              Save Job
            </button>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default JobDetail;
