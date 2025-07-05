
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
   
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
       
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          <input
            type="text"
            className="flex-1 bg-white border border-gray-200 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for jobs"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            onClick={fetchJobs}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 text-sm sm:text-base font-medium"
          >
            Search
          </button>
        </div>

        {/* Employment Type Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          {employmentFilters.map(f => (
            <button
              key={f.value || 'all'}
              onClick={() => setEmpFilter(empFilter === f.value ? '' : f.value)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium ${
                empFilter === f.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } focus:outline-none transition-colors`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Location Filter */}
        <div className="mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-white border border-gray-200 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {dateFilters.map(f => (
            <button
              key={f}
              onClick={() => setDateFilter(f)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                dateFilter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              } focus:outline-none transition-colors`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center my-8 sm:my-12">
            <Loader className="animate-spin w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          </div>
        ) : (
          <>
            {/* Job Listings */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 dark:text-white">
              Job Listings
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {currentJobs.map(job => (
                <JobCard key={job.job_id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                ‹
              </button>
              
              {/* Page Numbers - Show fewer on mobile */}
              <div className="flex space-x-1 sm:space-x-2">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  // On mobile, show only current page and adjacent pages
                  const showOnMobile = Math.abs(pageNum - page) <= 1;
                  const showOnDesktop = true;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setPage(pageNum)}
                      className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium ${
                        page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      } ${showOnMobile ? 'block' : 'hidden'} sm:block`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                ›
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;