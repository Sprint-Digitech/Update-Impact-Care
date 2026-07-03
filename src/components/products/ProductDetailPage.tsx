"use client";

import React from "react";
import type { Product } from "@/lib/data/products";
import Link from "next/link";

export function ProductDetailPage({ product }: { product: Product }) {
  // Use a fallback image just in case the image doesn't load
  const imageSrc = product.imgSource ? `/assets/uploads/products/${product.imgSource}` : '/assets/uploads/products/tablet_mockup.png';

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      
      {/* Breadcrumb */}
      <div style={{ marginBottom: "40px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6c757d" }}>
        <Link href="/" style={{ color: "#00505A", textDecoration: "none", transition: "color 0.2s ease" }}>Home</Link>
        <span style={{ margin: "0 10px" }}>/</span>
        <Link href="/products" style={{ color: "#00505A", textDecoration: "none", transition: "color 0.2s ease" }}>Products</Link>
        <span style={{ margin: "0 10px" }}>/</span>
        <span style={{ color: "#0B1030", fontWeight: 600 }}>{product.title}</span>
      </div>

      {/* Top Section: Image and Info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "60px",
          alignItems: "start",
          background: "#ffffff",
          borderRadius: "32px",
          padding: "50px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.03)",
          marginBottom: "40px"
        }}
      >
        {/* Left Side: Image */}
        <div
          style={{
            background: "linear-gradient(145deg, #f0f7f9, #ffffff)",
            borderRadius: "24px",
            padding: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: "450px",
            boxShadow: "inset 0 0 40px rgba(0,80,90,0.03)"
          }}
        >
          <img
            src={imageSrc}
            alt={product.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              aspectRatio: "4/3",
              objectFit: "contain",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.15))"
            }}
          />
          {/* Decorative elements */}
          <div style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px", background: "url('/assets/images/pattern.svg')", opacity: 0.05 }}></div>
        </div>

        {/* Right Side: Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
          
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "linear-gradient(135deg, rgba(0, 80, 90, 0.1), rgba(0, 80, 90, 0.05))",
                color: "#00505A",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}
            >
              {product.category}
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: "42px",
                fontWeight: 800,
                color: "#0B1030",
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.15,
                background: "-webkit-linear-gradient(45deg, #0B1030, #00505A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {product.title}
            </h1>
          </div>

          {/* Description */}
          {product.description && (
            <div style={{ 
              fontSize: "17px", 
              color: "#4a5568", 
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
              borderLeft: "4px solid rgba(0, 80, 90, 0.2)",
              paddingLeft: "20px"
            }}>
              {product.description.split('\n').map((line, i) => (
                <p key={i} style={{ margin: "0 0 12px 0" }}>{line}</p>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <Link
              href="/contact-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #00505A, #001937)",
                color: "#ffffff",
                padding: "18px 40px",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                textDecoration: "none",
                boxShadow: "0 10px 25px rgba(0, 80, 90, 0.25)",
                transition: "all 0.3s ease",
                gap: "10px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 80, 90, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 80, 90, 0.25)";
              }}
            >
              Request a Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Section: Full Width Premium Details Table */}
      <div className="premium-table-container" style={{ 
        borderRadius: "24px", 
        border: "1px solid rgba(0,80,90,0.1)", 
        boxShadow: "0 15px 40px rgba(0,0,0,0.04)",
        overflowX: "auto",
        background: "#ffffff"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "linear-gradient(to right, #f8fafc, #f1f5f9)", borderBottom: "2px solid rgba(0,80,90,0.1)" }}>
              <th style={{ padding: "25px 30px", textAlign: "left", fontSize: "14px", fontWeight: 800, color: "#00505A", textTransform: "uppercase", letterSpacing: "1.5px", width: "25%" }}>
                Brand Name
              </th>
              <th style={{ padding: "25px 30px", textAlign: "left", fontSize: "14px", fontWeight: 800, color: "#00505A", textTransform: "uppercase", letterSpacing: "1.5px", width: "55%", borderLeft: "1px solid rgba(0,80,90,0.05)" }}>
                Composition
              </th>
              <th style={{ padding: "25px 30px", textAlign: "left", fontSize: "14px", fontWeight: 800, color: "#00505A", textTransform: "uppercase", letterSpacing: "1.5px", width: "20%", borderLeft: "1px solid rgba(0,80,90,0.05)" }}>
                Pack
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "35px 30px", fontSize: "18px", fontWeight: 700, color: "#0B1030", verticalAlign: "top" }}>
                {product.title}
                <div style={{ marginTop: "15px" }}>
                  <span style={{ 
                    fontSize: "13px", 
                    fontWeight: 600, 
                    color: "#64748b", 
                    background: "#f1f5f9", 
                    display: "inline-block", 
                    padding: "8px 16px", 
                    borderRadius: "20px",
                    letterSpacing: "0.5px",
                    border: "1px solid #e2e8f0"
                  }}>
                    {product.dosageForm}
                  </span>
                </div>
              </td>
              <td style={{ padding: "35px 30px", fontSize: "16px", color: "#334155", verticalAlign: "top", whiteSpace: "pre-wrap", lineHeight: 1.8, borderLeft: "1px solid rgba(0,80,90,0.05)" }}>
                {product.composition}
              </td>
              <td style={{ padding: "35px 30px", fontSize: "17px", fontWeight: 600, color: "#0B1030", verticalAlign: "top", whiteSpace: "pre-wrap", borderLeft: "1px solid rgba(0,80,90,0.05)" }}>
                {product.packDetail}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Mobile responsive styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 30px !important;
          }
          h1 {
            fontSize: 32px !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
