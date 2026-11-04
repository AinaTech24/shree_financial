"use client";

import React, { useState, useEffect, useMemo } from "react";
import type { LiveArticle } from "@/lib/live-blogs";
import { Search, ExternalLink, Clock, Calendar, Sparkles, Filter, Newspaper, Loader2 } from "lucide-react";

interface Props {
  initialArticles?: LiveArticle[];
}

const CATEGORIES = [
  "All",
  "SIP & Investing",
  "Mutual Funds",
  "Markets",
  "Economy",
  "Personal Finance",
];

export default function LiveBlogFeed({ initialArticles = [] }: Props) {
  const [articles, setArticles] = useState<LiveArticle[]>(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function loadFeeds() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data: LiveArticle[] = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setArticles(data);
          }
        }
      } catch (err) {
        console.error("Error loading blog feeds", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (articles.length === 0) {
      loadFeeds();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchCat =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="live-blog-wrapper">
      {/* Feed Controls Header */}
      <div className="blog-controls-card">
        <div className="blog-live-indicator">
          <span className="live-pulse-dot" />
          <span className="live-status-text">Live Financial &amp; Market Intelligence</span>
          <span className="live-count-badge">
            {loading ? "Syncing..." : `${articles.length} Feeds Synced`}
          </span>
        </div>

        <div className="blog-search-and-filter">
          {/* Search Box */}
          <div className="blog-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search markets, mutual funds, SIPs, RBI updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="blog-categories-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`blog-cat-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="blog-loading-container">
          <Loader2 size={36} className="animate-spin text-indigo-600" />
          <p>Syncing latest articles from MoneyControl, ET &amp; Mint...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="blog-empty-state">
          <Newspaper size={44} className="text-slate-400" />
          <h3>No articles match your criteria</h3>
          <p>Try searching for a different keyword or switch to &quot;All&quot; categories.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="live-blog-grid">
          {filtered.map((article) => (
            <article className="live-blog-card" key={article.id}>
              <div className="blog-card-media">
                <img
                  src={article.image}
                  alt={article.title}
                  className="blog-card-thumb"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                <span
                  className={`blog-source-pill source-${article.accent || "blue"}`}
                >
                  {article.source}
                </span>
                <span className="blog-card-cat-tag">{article.category}</span>
              </div>

              <div className="blog-card-body">
                <div className="blog-meta-row">
                  <span className="blog-meta-item">
                    <Calendar size={13} />
                    <span>{article.date || "Recent"}</span>
                  </span>
                  <span className="blog-meta-item">
                    <Clock size={13} />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="blog-card-headline">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="headline-link"
                  >
                    {article.title}
                  </a>
                </h3>

                <p className="blog-card-snippet">{article.excerpt}</p>

                <div className="blog-card-action">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-article-link"
                  >
                    <span>Read Full Story</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
