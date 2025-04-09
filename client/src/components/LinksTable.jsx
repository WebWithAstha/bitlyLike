import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clickShortUrl } from '../store/actions/linkActions.jsx';
import { useNavigate} from 'react-router-dom';
import Button from './partials/Button';

const LinksTable = ({ links }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const toggleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const handleShortClick = (shortCode)=>{
    try {
      dispatch(clickShortUrl(shortCode))
      const fullUrl = `${import.meta.env.VITE_BASE}${shortCode}`; 
      window.open(fullUrl, '_blank');
  
    } catch (error) {
      console.log(error)
      
    }
  }

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
    <div className="overflow-hidden rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Original URL</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Short URL</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Clicks</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {links.map((link) => {
              const isExpired = link.expiresAt && new Date(link.expiresAt) <= new Date();
              const isActive = link.expiresAt ? !isExpired : true;
              const isExpanded = expandedRow === link._id;
              
              return (
                <React.Fragment key={link._id}>
                  <tr className={`${isExpanded ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'} transition-colors duration-200`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleExpandRow(link._id)}
                          className="mr-2 cursor-pointer hover:scale-110 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                        >
                          <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="max-w-xs  cursor-pointer truncate text-sm text-gray-900 dark:text-gray-200">
                          {link.originalUrl}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div onClick={e=>handleShortClick(link.shortCode)} className="text-sm text-blue-600 underline dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        {import.meta.env.VITE_BASE + link.shortCode}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 dark:text-gray-200">
                          {link.clicks || 0}
                        </span>
                        {link.clicks > 0 && (
                          <span className="ml-2 flex-shrink-0 text-xs inline-block py-0.5 px-1.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                          No Expiry
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="" 
                        onClick={() => navigate(`/analytics/${link._id}`)}
                      >
                        <Button title={"Analytics"} short={true}/>

                      </div>
                      
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-indigo-50 dark:bg-indigo-900/20">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <span className="font-medium text-gray-500 dark:text-gray-400">Full URL</span>
                              <p className="mt-1 break-all">{link.originalUrl}</p>
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
    </div>
  );
};

export default LinksTable;