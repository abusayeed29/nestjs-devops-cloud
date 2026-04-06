"use client";

import { useEffect, useRef, useState } from "react";
import { useCategory } from "@/hooks/useCategory";
import type { Category } from "@/types/category.types";

const CATEGORY_EMOJIS: Record<string, string> = {
  laptop: "💻", pc: "💻", computer: "💻",
  watch: "⌚", watches: "⌚",
  mobile: "📱", tablet: "📱", phone: "📱",
  health: "🏃", sport: "🏃", fitness: "🏃", sports: "🏃",
  appliance: "🏠", kitchen: "🏠", home: "🏠",
  game: "🎮", games: "🎮", video: "🎮", console: "🎮",
  fashion: "👗", clothing: "👗", cloth: "👗",
  beauty: "💄", cosmetic: "💄",
  book: "📚", education: "📚",
  food: "🍔", grocery: "🍔",
  toy: "🧸", toys: "🧸",
  jewel: "💎", jewelry: "💎",
};

function getCategoryEmoji(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return "🛍️";
}

interface CategorySectionProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function CategorySection({ selectedId, onSelect }: CategorySectionProps) {
  const { categories, isLoading, getCategories } = useCategory();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [categories]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  const handleSelect = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", gap: "24px", overflowX: "hidden" }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#f3f4f6" }} className="animate-pulse" />
                <div style={{ width: "70px", height: "12px", background: "#f3f4f6", borderRadius: "4px" }} className="animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>Browse by Category</h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", cursor: canScrollLeft ? "pointer" : "not-allowed", opacity: canScrollLeft ? 1 : 0.4, transition: "all 0.15s", color: "#374151" }}
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", cursor: canScrollRight ? "pointer" : "not-allowed", opacity: canScrollRight ? 1 : 0.4, transition: "all 0.15s", color: "#374151" }}
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable circle cards */}
        <div
          ref={scrollRef}
          style={{ display: "flex", gap: "20px", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", paddingBottom: "4px" }}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedId === cat.id}
              onClick={() => handleSelect(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, isSelected, onClick }: { category: Category; isSelected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const emoji = getCategoryEmoji(category.name);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", flexShrink: 0, width: "110px", background: "none", border: "none", cursor: "pointer", padding: "4px", outline: "none" }}
    >
      {/* Circle */}
      <div style={{
        width: "90px", height: "90px", borderRadius: "50%",
        background: isSelected ? "#eef0fd" : hovered ? "#f0f1fe" : "#f3f4f6",
        border: `3px solid ${isSelected ? "#3c50e0" : "transparent"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", transition: "all 0.2s", flexShrink: 0,
        boxShadow: isSelected ? "0 0 0 2px #3c50e0" : hovered ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
      }}>
        {category.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={category.imageUrl}
            alt={category.name}
            style={{ width: "70px", height: "70px", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: "36px", lineHeight: 1 }}>{emoji}</span>
        )}
      </div>

      {/* Name */}
      <span style={{
        fontSize: "13px", fontWeight: isSelected ? 700 : 500,
        color: isSelected ? "#3c50e0" : "#374151",
        textAlign: "center", lineHeight: 1.3, transition: "color 0.15s",
        wordBreak: "break-word", maxWidth: "100px",
      }}>
        {category.name}
      </span>
    </button>
  );
}
