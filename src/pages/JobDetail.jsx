

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
      <div className="flex justify-center py-8 sm:py-10">
        <LoaderCircle className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">No job data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen mt-16 sm:mt-20 dark:bg-gray-950">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {job.data?.map((job) => (
          <div key={job.job_id}>
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
              Home / {job.job_title}
            </div>

            {/* Job Title and Company */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 dark:text-white leading-tight">
              {job.job_title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              {job.employer_name} &middot; {job.job_city}
            </p>

            {/* Job Description */}
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {job.job_description?.split(" ").slice(0, 30).join(" ")}
                {job.job_description?.split(" ").length > 30 ? "..." : ""}
              </p>
            </div>

            {/* Responsibilities Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 dark:text-white">
                Responsibilities
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {Array.isArray(job.job_highlights?.Responsibilities) ? (
                  job.job_highlights.Responsibilities?.slice(0, 5).map(
                    (item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded"></div>
                        </div>
                        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <span className="text-sm sm:text-base text-gray-400 italic">
                    No responsibilities listed.
                  </span>
                )}
              </div>
            </div>

            {/* Requirements Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 dark:text-white">
                Requirements
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {Array.isArray(job.job_highlights?.Qualifications) &&
                job.job_highlights.Qualifications.length > 0 ? (
                  job.job_highlights.Qualifications.slice(0, 5).map(
                    (item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded"></div>
                        </div>
                        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <span className="text-sm sm:text-base text-gray-400 italic">
                    No qualifications listed.
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a
                href={job.job_apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-medium py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center text-sm sm:text-base"
              >
                Apply Now
              </a>
              <button
                className="border border-gray-300 text-gray-700 font-medium py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                onClick={() => saveJob(job)}
              >
                Save Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetail;