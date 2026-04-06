"use client"

import Link from "next/link"

interface BreadcrumbsProps {
  productName: string
}

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  return (
    <div className="py-6 border-b border-[#e5e7eb]">
      <div className="max-w-[1200px] mx-auto px-4">
        <nav className="flex items-center gap-2 flex-wrap text-sm text-gray-500">
          <Link
            href="/"
            className="text-gray-500 no-underline transition-colors hover:text-[#1a1a2e]"
          >
            Store
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#1a1a2e] font-medium">{productName}</span>
        </nav>
      </div>
    </div>
  )
}
