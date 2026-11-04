"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { LiveArticle } from "@/lib/blogs";
import { Calendar, Clock, ExternalLink, ArrowRight, Radio } from "lucide-react";

export default function HomeNewsWidget() {
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then((res) => (res.ok ? res.json() : { articles: [] }))
      .then((data) => {
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && articles.length === 0) {
    return null;
  }

  return (
    <section className="section landing-news-section">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">
            <Radio size={13} className="live-pulsing-icon" /> Market Pulse
          </span>
          <h2>Latest Financial Updates &amp; Trends</h2>
          <p>Real-time mutual fund and market news curated from MoneyControl, ET Mutual Funds &amp; Mint.</p>
        </div>

        <div className="landing-news-grid">
          {articles.map((article) => (
            <article key={article.id} className="landing-news-card">
              <div className="news-card-thumb">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                <span className={`news-source-tag ${article.accent}`}>{article.source}</span>
              </div>
              <div className="news-card-body">
                <div className="news-card-meta">
                  <span>
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span>
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>
                <h3 className="news-card-title">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p className="news-card-excerpt">{article.excerpt}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-read-link"
                >
                  <span>Read on {article.source}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="landing-news-footer">
          <Link href="/blog" className="btn btn-ghost">
            <span>View All Articles &amp; Market Feeds</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

