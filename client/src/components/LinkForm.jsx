import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createShortLink } from '../store/actions/linkActions';
import Button from './partials/Button';

const LinkForm = () => {
  console.log("orbaot");
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    originalUrl: '',
    customAlias: '',
    expirationDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting..");
    dispatch(createShortLink(form));
    // setForm({ originalUrl: '', customAlias: '', expirationDate: '' });
  };

  return (
    <div className="w-full md:h-96">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative">
          <label htmlFor="originalUrl" className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 block">
            Original URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              id="originalUrl"
              name="originalUrl"
              value={form.originalUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/very-long-url-to-shorten"
              className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <label htmlFor="customAlias" className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 block">
              Custom Alias (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <input
                id="customAlias"
                name="customAlias"
                value={form.customAlias}
                onChange={handleChange}
                placeholder="my-custom-link"
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="expirationDate" className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 block">
              Expiration Date (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="expirationDate"
                name="expirationDate"
                value={form.expirationDate}
                onChange={handleChange}
                type="date"
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        
        <Button title={"Create Link"} />
      </form>
    </div>
  );
};

export default LinkForm;