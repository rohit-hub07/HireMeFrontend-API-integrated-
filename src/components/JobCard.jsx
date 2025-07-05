import { useJobStore } from '../store/useJobStore';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { jobDetail } = useJobStore();
  return (
    <div className="flex justify-between bg-white rounded-lg shadow p-4 mb-4  dark:bg-gray-950">
      <div>
        <p className="text-sm text-gray-500">Posted {job?.job_posted_at}</p>
        <h3 className="text-lg font-semibold text-gray-800 mt-1">
          {job?.job_title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {job?.employer_name} &ndash; {job?.job_city}
        </p>
        <Link to={`/jobdetail/${job?.job_id}`}>
          <button onClick={() => jobDetail(job?.job_id)} className="mt-4 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
          Apply
        </button>
        </Link>
      </div>
      {job?.employer_logo && (
        <img
          src={job?.employer_logo}
          alt="logo"
          className="h-24 w-40 object-cover rounded-md"
        />
      )}
    </div>
  );
};

export default JobCard;