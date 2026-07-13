"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data/products";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";

export function ProductsCatalog() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    
    if (cat) {
      setActiveCategory(cat);
    } else {
      setActiveCategory("All");
    }
    
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }
    
    if (cat || search) {
      setTimeout(() => {
        if (catalogRef.current) {
          const yOffset = -100; // offset for fixed header
          const y = catalogRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // Wait for page to fully render/hydrate
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      p.category.split(",").forEach((c) => cats.add(c.trim()));
    });
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== "All") {
      result = result.filter((p) =>
        p.category.split(",").map((c) => c.trim()).includes(activeCategory)
      );
    }
    
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter((p) => 
        p.title.toLowerCase().includes(lowerQ) || 
        (p.description && p.description.toLowerCase().includes(lowerQ))
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div ref={catalogRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {searchQuery && (
        <div style={{ marginBottom: "30px", fontSize: "1.1rem", padding: "15px", background: "#f8f9fa", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>Search results for: <strong>&quot;{searchQuery}&quot;</strong></div>
          <button 
            onClick={() => window.location.href = '/products'} 
            style={{ color: "#d9534f", cursor: "pointer", background: "none", border: "1px solid #d9534f", padding: "5px 15px", borderRadius: "4px" }}
          >
            Clear Search
          </button>
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div style={{ padding: "60px 20px", textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
           No products found matching your search.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px"
          }}
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
