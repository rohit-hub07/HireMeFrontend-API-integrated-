
import { useJobStore } from '../store/useJobStore';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { jobDetail } = useJobStore();
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4 sm:p-6 mb-3 sm:mb-4 dark:bg-gray-950">
      <div className="flex-1 order-2 sm:order-1 mt-4 sm:mt-0">
        <p className="text-xs sm:text-sm text-gray-500">Posted {job?.job_posted_at}</p>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-1 sm:mt-2 dark:text-white leading-tight">
          {job?.job_title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
          {job?.employer_name} &ndash; {job?.job_city}
        </p>
        <Link to={`/jobdetail/${job?.job_id}`}>
          <button 
            onClick={() => jobDetail(job?.job_id)} 
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 text-sm sm:text-base font-medium transition-colors"
          >
            Apply
          </button>
        </Link>
      </div>
      <div className="flex-shrink-0 order-1 sm:order-2 sm:ml-4">
        <img
          src={job?.employer_logo || "https://via.placeholder.com/160x96?text=No+Logo"}
          alt="logo"
          className="h-20 w-full sm:h-20 sm:w-32 lg:h-24 lg:w-40 object-cover rounded-md bg-gray-100"
        />
      </div>
    </div>
  );
};

export default JobCard;