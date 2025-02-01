// src/components/ResponsiveResearchPlatform.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Search, BookOpen, MessageSquare, Share2, ThumbsUp, Bookmark, Bell, Upload, Moon, Sun, Menu, X, Eye, Clock } from 'lucide-react';
import axios from 'axios';

const ResponsiveResearchPlatform = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const history = useHistory();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for user authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      axios.get('http://localhost:5000/api/auth/verify', {
        headers: { 'Authorization': token }
      })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  // Fetch articles from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const handleUploadClick = () => {
    if (!user) {
      history.push('/login');
    } else {
      history.push('/upload');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start pt-16 px-4">
          <div className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search articles..."
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-900'
                } border`}
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="ml-2 p-2"
              >
                <X className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} sticky top-0 z-40 shadow-sm`}>
        <div className="max-w-7xl mx-auto">
          {/* Main Nav */}
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left section */}
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="mr-2"
                >
                  {mobileMenuOpen ? (
                    <X className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                  ) : (
                    <Menu className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                  )}
                </button>
              )}
              <BookOpen className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} hidden sm:block`}>
                Rational Discourse
              </span>
            </div>

            {/* Desktop Search */}
            {!isMobile && (
              <div className="flex-1 max-w-xl px-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-100 border-gray-200 text-gray-900'
                    } border`}
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            {/* Right section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isMobile && (
                <button onClick={() => setSearchOpen(true)}>
                  <Search className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? (
                  <Sun className="h-6 w-6 text-white" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <Bell className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {user.email}
                  </span>
                  <button
                    onClick={handleUploadClick}
                    className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white px-3 py-2 rounded-lg flex items-center`}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="hidden sm:block ml-2">Upload</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleUploadClick}
                  className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white px-3 py-2 rounded-lg flex items-center`}
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:block ml-2">Upload</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} px-4 py-2`}>
              {['Trending', 'Latest', 'Most Cited', 'Discussions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 ${
                    activeTab === tab.toLowerCase()
                      ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Tabs */}
      {!isMobile && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-6">
              {['Trending', 'Latest', 'Most Cited', 'Discussions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-4 ${
                    activeTab === tab.toLowerCase()
                      ? isDarkMode 
                        ? 'border-b-2 border-blue-400 text-blue-400'
                        : 'border-b-2 border-blue-600 text-blue-600'
                      : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-6">
          {articles.map(article => (
            <article 
              key={article.id}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg overflow-hidden`}
            >
              {/* Article Image */}
              <img
                src={article.image_url || '/placeholder.png'}
                alt="Article thumbnail"
                className="w-full h-48 sm:h-64 object-cover"
              />
              
              {/* Article Content */}
              <div className="p-4 sm:p-6">
                <h2 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {article.title}
                </h2>
                
                {/* Author Info - Responsive */}
                <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {article.author}
                  </span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {article.publishDate}
                  </span>
                </div>

                {/* Abstract - Responsive */}
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3 text-sm sm:text-base`}>
                  {article.abstract}
                </p>

                {/* Tags - Responsive */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.split(',').map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                        isDarkMode
                          ? 'bg-gray-700 text-blue-400'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Metrics and Actions - Responsive */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views}
                    </span>
                    <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResponsiveResearchPlatform;
