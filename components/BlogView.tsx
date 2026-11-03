"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { LiveArticle } from "@/lib/blogs";
import {
  Search,
  Calendar,
  Clock,
  ExternalLink,
  BookOpen,
  X,
  Radio,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface BlogViewProps {
  inHousePosts: { id: number; title: string; date: string; cat: string; img: string; html: string }[];
}

export default function BlogView({ inHousePosts }: BlogViewProps) {
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSource, setActiveSource] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = ["All", "Mutual Funds", "SIP & Investing", "Markets", "Personal Finance", "Economy"];
  const sources = ["All", "MoneyControl", "ET Mutual Funds", "Mint Money", "ET Markets"];

  const loadLiveArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
      }
    } catch (err) {
      console.error("Failed to load live feeds", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat = activeCategory === "All" || art.category === activeCategory;
      const matchSrc = activeSource === "All" || art.source === activeSource;
      const matchQuery =
        !searchTerm.trim() ||
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSrc && matchQuery;
    });
  }, [articles, activeCategory, activeSource, searchTerm]);

  return (
    <div className="blog-portal-wrapper">
      {/* Featured In-House Educational Post */}
      {inHousePosts.length > 0 && activeCategory === "All" && !searchTerm && (
        <div className="featured-blog-spotlight">
          <div className="spotlight-image-holder">
            <img src={inHousePosts[0].img} alt={inHousePosts[0].title} className="spotlight-img" />
            <span className="spotlight-tag">In-House Insights</span>
          </div>
          <div className="spotlight-content">
            <div className="spotlight-meta">
              <span className="spotlight-cat">{inHousePosts[0].cat}</span>
              <span className="spotlight-date">
                <Calendar size={13} /> {inHousePosts[0].date}
              </span>
            </div>
            <h2 className="spotlight-title">{inHousePosts[0].title}</h2>
            <p className="spotlight-excerpt">
              Comprehensive guidance from the team at Shah Financial Services to navigate mutual fund investing,
              portfolio allocation, and compounding discipline.
            </p>
            <Link href={`/blog/${inHousePosts[0].id}`} className="btn btn-primary spotlight-btn">
              <span>Read Full Analysis</span>
              <BookOpen size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Control Bar: Categories & Search */}
      <div className="blog-filters-bar">
        {/* Category Pills */}
        <div className="category-pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-filter-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Source Filter */}
        <div className="search-and-source-row">
          <div className="blog-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search news & articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="blog-search-input"
            />
            {searchTerm && (
              <button type="button" className="clear-search-btn" onClick={() => setSearchTerm("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="source-select-box">
            <select
              value={activeSource}
              onChange={(e) => setActiveSource(e.target.value)}
              className="source-dropdown"
              aria-label="Filter by source"
            >
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src === "All" ? "All Sources" : src}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="refresh-feed-btn"
            title="Refresh live feeds"
            onClick={loadLiveArticles}
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Article Results Count and Live Status */}
      <div className="results-count-bar">
        <div className="live-status-chip">
          <Radio size={14} className="live-pulsing-icon" />
          <span>Live Market Feeds</span>
        </div>
        <span>
          Showing <strong>{filteredArticles.length}</strong> live articles from verified financial publications
        </span>
      </div>

      {/* Loading Skeleton */}
      {loading && articles.length === 0 && (
        <div className="blog-loading-state">
          <Loader2 size={36} className="animate-spin text-indigo-600" />
          <p>Fetching real-time articles from MoneyControl, ET Mutual Funds &amp; Mint...</p>
        </div>
      )}

      {/* Grid of Modern Live Articles */}
      <div className="live-articles-grid">
        {filteredArticles.map((article) => {
          const isExternal = Boolean(article.url && article.url.startsWith("http"));

          return (
            <article key={article.id} className="live-blog-card">
              <div className="card-thumb-container">
                <img
                  src={article.image}
                  alt={article.title}
                  className="card-thumb-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                <span className={`source-badge ${article.accent}`}>{article.source}</span>
                <span className="card-cat-tag">{article.category}</span>
              </div>

              <div className="card-info-content">
                <div className="card-meta-line">
                  <span className="meta-item">
                    <Calendar size={13} /> {article.date}
                  </span>
                  <span className="meta-item">
                    <Clock size={13} /> {article.readTime}
                  </span>
                </div>

                <h3 className="card-article-title">
                  {isExternal ? (
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  ) : (
                    <span>{article.title}</span>
                  )}
                </h3>

                <p className="card-article-excerpt">{article.excerpt}</p>

                <div className="card-read-action">
                  {isExternal ? (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more-link"
                    >
                      <span>Read on {article.source}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="read-more-link">
                      <span>Read Article</span>
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && filteredArticles.length === 0 && (
        <div className="blog-empty-state">
          <BookOpen size={48} className="empty-icon" />
          <h3>No articles found</h3>
          <p>Try searching for a different keyword or resetting your category filters.</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setActiveCategory("All");
              setActiveSource("All");
              setSearchTerm("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* In-House Articles Section */}
      {inHousePosts.length > 1 && (
        <div className="in-house-section">
          <div className="sec-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Investor Education</span>
            <h2>Shah Financial Services Research Library</h2>
            <p>In-depth proprietary investor guides and wealth management tutorials.</p>
          </div>

          <div className="in-house-grid">
            {inHousePosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="in-house-card">
                <img src={post.img} alt={post.title} className="in-house-img" />
                <div className="in-house-body">
                  <span className="in-house-cat">{post.cat}</span>
                  <h4>{post.title}</h4>
                  <span className="in-house-link">Read Full Guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
