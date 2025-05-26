import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password},navigate));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
     

      <div className="w-full lg:w-1/2 flex items-center mx-auto dark:text-white/[.7] justify-center p-6">
        <div className="w-full max-w-md dark:bg-black/[.2] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold ">Log In</h2>
              <p className="mt-2 dark:text-gray-200">Enter your credentials to access your account</p>
              <div className="mt-4 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded p-2 text-xs">
                <strong>Test Account:</strong> <br />
                Email: <span className="font-mono">test@gmail.com</span><br />
                Password: <span className="font-mono">Test123</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="bg-gray-300/[.3] outline-zinc-500/[.1] border border-transparent  block w-full pl-10 pr-3 py-3 rounded-lg"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium ">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-300/[.3] outline-zinc-500/[.1] border border-transparent  block w-full pl-10 pr-10 py-3 rounded-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-white/[.6]" />
                    ) : (
                      <Eye size={18} className="text-white/[.6]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4  border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm ">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium 
                  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300
        hover:from-gray-200 hover:via-gray-300 hover:to-gray-400
        active:from-gray-300 active:to-gray-500
        text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

          
          </div>
          
          <div className="px-8 py-4 bg-gray-300/[.3] border-t border-white/[.1] text-center">
            <p className="text-sm dark:text-gray-200">
              Have a great experience...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;