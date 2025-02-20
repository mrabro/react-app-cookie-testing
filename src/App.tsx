import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Cookie } from 'lucide-react';

function App() {
  const [cookieName, setCookieName] = useState('');
  const [cookieValue, setCookieValue] = useState('');
  const [cookies, setCookies] = useState<{[key: string]: string}>({});
  const [domain, setDomain] = useState('');

  useEffect(() => {
    // Get all cookies on component mount
    updateCookiesList();
  }, []);

  const updateCookiesList = () => {
    const allCookies = Cookies.get();
    setCookies(allCookies);
  };

  const handleSetCookie = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cookieName && cookieValue) {
      const options: Cookies.CookieAttributes = {
        expires: 7, // Cookie expires in 7 days
        secure: true,
        sameSite: 'strict'
      };

      // If domain is specified, add it to options
      if (domain) {
        options.domain = domain;
      }
      Cookies.set(cookieName, cookieValue, options);
      updateCookiesList();
      
      // Clear form
      setCookieName('');
      setCookieValue('');
      setDomain('');
    }
  };

  const handleRemoveCookie = (name: string) => {
    Cookies.remove(name);
    updateCookiesList();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Cookie className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Cookie Manager</h1>
          </div>

          <form onSubmit={handleSetCookie} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cookie Name
              </label>
              <input
                type="text"
                value={cookieName}
                onChange={(e) => setCookieName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cookie name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cookie Value
              </label>
              <input
                type="text"
                value={cookieValue}
                onChange={(e) => setCookieValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cookie value"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain (optional)
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., .example.com"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty for current domain only, use .example.com for all subdomains
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Set Cookie
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Cookies</h2>
          {Object.keys(cookies).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(cookies).map(([name, value]) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium text-gray-700">{name}</p>
                    <p className="text-sm text-gray-500">{value}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveCookie(name)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No cookies found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;