import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import { Loader } from 'lucide-react'; // <-- Import Loader

const employmentFilters = [
  { label: 'All', value: '' },
  { label: 'Full-time', value: 'FULLTIME' },
  { label: 'Part-time', value: 'PARTTIME' },
  { label: 'Contract', value: 'CONTRACT' },
];
const dateFilters = ['Last 24h', 'Last 7d', 'Last 30d'];
const ITEMS_PER_PAGE = 5;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [empFilter, setEmpFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 

  const fetchJobs = async () => {
    setLoading(true);
    const query = searchTerm.trim() || 'developer jobs in india';
    const res = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&country=in&date_posted=all`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      }
    );
    const { data } = await res.json();
    setJobs(data);
    setFiltered(data);
    setPage(1);
    setLoading(false); 
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let temp = [...jobs];
    if (empFilter && empFilter !== '') {
      temp = temp.filter(j =>
        Array.isArray(j.job_employment_types) &&
        j.job_employment_types.includes(empFilter)
      );
    }
    setFiltered(temp);
    setPage(1);
  }, [empFilter, jobs]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentJobs = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50  dark:bg-gray-950">
   
      <main className="max-w-6xl mx-auto p-6">
       
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            className="flex-1 bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for jobs"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            onClick={fetchJobs}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        
        <div className="flex flex-wrap gap-2 mb-4">
          {employmentFilters.map(f => (
            <button
              key={f.value || 'all'}
              onClick={() => setEmpFilter(empFilter === f.value ? '' : f.value)}
              className={`px-4 py-2 rounded-full border ${
                empFilter === f.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              } focus:outline-none`}
            >
              {f.label}
            </button>
          ))}
        </div>

       
        <div className="mb-4">
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <div className="flex flex-wrap gap-2 mb-8">
          {dateFilters.map(f => (
            <button
              key={f}
              onClick={() => setDateFilter(f)}
              className={`px-4 py-2 rounded-full ${
                dateFilter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              } focus:outline-none`}
            >
              {f}
            </button>
          ))}
        </div>

        
        {loading ? (
          <div className="flex justify-center items-center my-12">
            <Loader className="animate-spin w-10 h-10 text-blue-600" />
          </div>
        ) : (
          <>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Job Listings</h2>
            {currentJobs.map(job => (
              <JobCard key={job.job_id} job={job} />
            ))}

            
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-full bg-white border border-gray-300"
              >‹</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-full ${
                    page === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-full bg-white border border-gray-300"
              >›</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
