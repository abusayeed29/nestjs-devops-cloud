"use client";

import { useState } from "react";
import { CategorySection } from "./CategorySection";
import { ProductList } from "./ProductList";

export function LandingContent() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <>
      <CategorySection selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />
      <ProductList categoryId={selectedCategoryId} />
    </>
  );
}
