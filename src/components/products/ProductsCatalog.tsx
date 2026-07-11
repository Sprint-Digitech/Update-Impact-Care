"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data/products";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";

export function ProductsCatalog() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
      setTimeout(() => {
        if (catalogRef.current) {
          const yOffset = -100; // offset for fixed header
          const y = catalogRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // Wait for page to fully render/hydrate
    } else {
      setActiveCategory("All");
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
    if (activeCategory === "All") return products;
    return products.filter((p) =>
      p.category.split(",").map((c) => c.trim()).includes(activeCategory)
    );
  }, [activeCategory]);

  return (
    <div ref={catalogRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
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
    </div>
  );
}
