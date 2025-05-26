import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { clickShortUrl } from '../store/actions/linkActions.jsx';
import { useNavigate } from 'react-router-dom';
import Button from './partials/Button';

const LinksTable = ({ links }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter and sort links
  const filteredAndSortedLinks = useMemo(() => {
    let filtered = links.filter(link => 
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'createdAt' || sortField === 'expiresAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortField === 'clicks') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [links, searchTerm, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedLinks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLinks = filteredAndSortedLinks.slice(startIndex, endIndex);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const toggleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleShortClick = (shortCode) => {
    try {
      dispatch(clickShortUrl(shortCode));
      const fullUrl = `${import.meta.env.VITE_BASE}${shortCode}`;
      window.open(fullUrl, '_blank');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedRow(null); // Close expanded rows when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setExpandedRow(null);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return (
      <svg className={`w-4 h-4 ml-1 text-indigo-600 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  };

  if (links.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
          <svg className="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No links found</h3>
        <p className="text-gray-500 dark:text-gray-400">Create your first shortened link to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedLinks.length)} of {filteredAndSortedLinks.length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('originalUrl')}
                  className="flex items-center hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                >
                  Original URL
                  <SortIcon field="originalUrl" />
                </button>
              </th>
              <th scope="col" className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Short URL</th>
              <th scope="col" className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('clicks')}
                  className="flex items-center hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                >
                  Clicks
                  <SortIcon field="clicks" />
                </button>
              </th>
              <th scope="col" className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                >
                  Created
                  <SortIcon field="createdAt" />
                </button>
              </th>
              <th scope="col" className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {currentLinks.map((link) => {
              const isExpired = link.expiresAt && new Date(link.expiresAt) <= new Date();
              const isActive = link.expiresAt ? !isExpired : true;
              const isExpanded = expandedRow === link._id;
              
              return (
                <React.Fragment key={link._id}>
                  <tr className={`${isExpanded ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'} transition-colors duration-200 text-xs sm:text-sm md:text-base`}> 
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap max-w-[120px] sm:max-w-xs truncate">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleExpandRow(link._id)}
                          className="mr-2 cursor-pointer hover:scale-110 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none transition-transform"
                        >
                          <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="max-w-xs cursor-pointer truncate text-sm text-gray-900 dark:text-gray-200" title={link.originalUrl}>
                          {link.originalUrl}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleShortClick(link.shortCode)}
                        className="text-sm text-blue-600 underline dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        {import.meta.env.VITE_BASE + link.shortCode}
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {link.clicks || 0}
                        </span>
                        {link.clicks > 0 && (
                          <span className="ml-2 flex-shrink-0 text-xs inline-block py-0.5 px-1.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col">
                        <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(link.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                      {link.expiresAt ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {isActive ? 'Active' : 'Expired'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Permanent
                        </span>
                      )}
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                      <div onClick={() => navigate(`/analytics/${link._id}`)}>
                        <Button title={"Analytics"} short={true}/>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-indigo-50 dark:bg-indigo-900/20">
                      <td colSpan="6" className="px-2 sm:px-6 py-2 sm:py-4">
                        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                            <div>
                              <span className="font-medium text-gray-500 dark:text-gray-400">Full URL</span>
                              <p className="mt-1 break-all text-blue-600 dark:text-blue-400">{link.originalUrl}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500 dark:text-gray-400">Short Code</span>
                              <p className="mt-1 font-mono text-indigo-600 dark:text-indigo-400">{link.shortCode}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500 dark:text-gray-400">Total Clicks</span>
                              <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">{link.clicks || 0}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500 dark:text-gray-400">Creation Date</span>
                              <p className="mt-1">{new Date(link.createdAt).toLocaleString()}</p>
                            </div>
                            {link.expiresAt && (
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">Expiration Date</span>
                                <p className="mt-1">{new Date(link.expiresAt).toLocaleString()}</p>
                              </div>
                            )}
                            <div>
                              <span className="font-medium text-gray-500 dark:text-gray-400">Actions</span>
                              <div className="mt-1 flex space-x-2">
                                <button
                                  onClick={() => navigator.clipboard.writeText(import.meta.env.VITE_BASE + link.shortCode)}
                                  className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                                >
                                  Copy Link
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-2 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 rounded-lg shadow space-y-2 sm:space-y-0">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(endIndex, filteredAndSortedLinks.length)}
                </span>{' '}
                of <span className="font-medium">{filteredAndSortedLinks.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span
                        key={page}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinksTable;