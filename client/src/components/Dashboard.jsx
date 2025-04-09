import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLinks } from "../store/actions/linkActions.jsx";
import LinkForm from "../components/LinkForm.jsx";
import LinksTable from "../components/LinksTable.jsx";
import AnalyticsSection from "../components/AnalyticsSection.jsx";
import { useNavigate } from "react-router-dom";
import QuickStats from "./QuickStats.jsx";
import { logoutUser } from "../store/actions/authActions.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allLinks, loading } = useSelector((state) => state.links);
  useEffect(() => {
    dispatch(fetchAllLinks());
  }, [dispatch]);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logoutUser(navigate));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Header handleLogout={handleLogout} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Link Creation Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Create New Link
              </h2>
              <LinkForm />
            </div>
          </div>

          {/* Analytics Preview Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Quick Analytics
              </h2>
              {/* <AnalyticsSection /> */}
              <QuickStats />
            </div>
          </div>
        </div>

        {/* Links Table Card */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              All Links
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <LinksTable links={allLinks} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ handleLogout }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mini Bitly
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and analyze your shortened links
        </p>
      </div>
      <div className="max-32 md:mt-0 mt-2">
        <button
          onClick={handleLogout}
          className="text-sm font-medium px-4 py-2 cursor-pointer bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
