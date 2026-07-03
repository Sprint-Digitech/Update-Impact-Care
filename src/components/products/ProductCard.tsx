import React from "react";
import type { Product } from "@/lib/data/products";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="product-card"
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        border: "1px solid rgba(0,0,0,0.03)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image Container */}
      <div
        className="product-image-container"
        style={{
          width: "100%",
          padding: "30px",
          background: "#f9fbfd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <Link href={`/products/${product.slug}`} style={{ display: "block", width: "100%", textAlign: "center" }}>
          <img
            src={product.imgSource ? `/assets/uploads/products/${product.imgSource}` : '/assets/uploads/products/tablet_mockup.png'}
            alt={product.title}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "contain",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.1))",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>
      </div>

      {/* Info Container */}
      <div
        className="product-info-container"
        style={{
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          background: "#ffffff"
        }}
      >
        {/* Category Badge */}
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              background: "rgba(0, 80, 90, 0.1)",
              color: "#00505A",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.5px",
              textTransform: "uppercase"
            }}
          >
            {product.category.split(',')[0]} {/* Display first category if multiple */}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "18px",
              fontWeight: 700,
              color: "#0B1030",
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1.3
            }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p
          style={{
            margin: "0 0 20px 0",
            fontSize: "14px",
            color: "#6c757d",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.5,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.description || "No description available."}
        </p>

        {/* Action Button */}
        <Link
          href={`/products/${product.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "#00505A",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            textDecoration: "none",
            gap: "8px",
            transition: "color 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#001937")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#00505A")}
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
}
