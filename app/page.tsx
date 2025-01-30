"use client";
import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchAnimations } from "app/styles/animation/search-animation";
import "app/styles/page.css";

// Lazy loaded components
const ImageResult = lazy(() => import("app/components/ui/ImageResult"));
const GoogleAnalytics = lazy(() => import("app/components/ui/GoogleAnalytics"));
const RedditAnalytics = lazy(() => import("app/components/ui/RedditAnalytics"));
const YoutubeAnalysis = lazy(() => import("app/components/ui/YoutubeAnalysis"));
const TrendAnalysis = lazy(() => import("app/components/ui/TrendAnalysis"));
const NewsResults = lazy(() => import("app/components/ui/NewsResults"));
const Summary = lazy(() => import("app/components/ui/Summary"));
const StoryBoard = lazy(() => import("app/components/ui/StoryBoard"));
const AdsAnalytics = lazy(() => import("app/components/ui/AdsAnalytics"));
const PlayStoreAnalytics = lazy(() => import("app/components/ui/PlayStoreAnalytics"));

const Page: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setIsSearching(true);
      setSubmittedQuery(query);
      setTimeout(() => setIsSearching(false), 1000); // Simulate a search delay
    }
  };

  return (
    <div className="search-container">
      {/* Logo */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-5xl font-bold text-white mb-8 tracking-wide"
      >
        Peekaboo
      </motion.h1>

      {/* Search Section */}
      <motion.div
        layout
        className={`search-section ${submittedQuery ? "search-section--submitted" : ""}`}
      >
        <form onSubmit={handleSearch} className="search-form">
          <motion.div
            className="search-bar-wrapper"
            variants={searchAnimations.searchBar}
            animate={isSearching ? "focused" : "unfocused"}
          >
            <input
              type="text"
              placeholder="Enter your query here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="search-button"
            >
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="search-loader"
                >
                  ○
                </motion.div>
              ) : (
                "Search"
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      {/* Query Display */}
      <AnimatePresence mode="wait">
        {submittedQuery && (
          <motion.div
            variants={searchAnimations.fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="query-display"
          >
            Showing results for: <motion.span className="query-text">{submittedQuery}</motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <Suspense fallback={<div className="results-loader">Loading results...</div>}>
        <AnimatePresence mode="wait">
          {submittedQuery && (
            <motion.div
              variants={searchAnimations.stagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="results-container"
            >
              {[
                ImageResult, 
                GoogleAnalytics, 
                PlayStoreAnalytics,
                RedditAnalytics, 
                YoutubeAnalysis, 
                TrendAnalysis, 
                AdsAnalytics, 
                NewsResults, 
                Summary, 
                StoryBoard
              ].map((Component, index) => (
                <motion.div
                  key={index}
                  variants={searchAnimations.fadeUp}
                  layout
                  className="result-card"
                >
                  {Component === PlayStoreAnalytics ? (
                    <Component query={submittedQuery} />
                  ) : (
                    <Component query={submittedQuery} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default Page;