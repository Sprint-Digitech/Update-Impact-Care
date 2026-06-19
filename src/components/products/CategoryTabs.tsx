"use client";

import React from "react";

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "50px", padding: "0 15px" }}>
      <style>{`
        .category-tabs-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .category-btn {
          font-size: 15px;
          padding: 10px 24px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          border-radius: 40px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
        }
        .category-btn.inactive {
          background: #ffffff;
          color: #475569;
          border-color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .category-btn.inactive:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .category-btn.active {
          background: linear-gradient(135deg, #00505A, #001937);
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(0, 80, 90, 0.25);
          transform: translateY(-2px);
          font-weight: 600;
          border-color: transparent;
        }
        @media (max-width: 768px) {
          .category-tabs-wrapper {
            gap: 10px;
          }
          .category-btn {
            font-size: 14px;
            padding: 8px 16px;
          }
        }
      `}</style>
      <div className="category-tabs-wrapper">
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              className={`category-btn ${isActive ? 'active' : 'inactive'}`}
              onClick={() => onCategoryChange(c)}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

