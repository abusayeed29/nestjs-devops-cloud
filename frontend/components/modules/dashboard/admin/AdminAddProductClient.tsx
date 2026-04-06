"use client";

import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { CategoryService } from "@/services/api/category.service";
import { AdminSidebar, AdminTopBar } from "./AdminChrome";
import type { Category } from "@/types/category.types";
import type { CreateProductRequest } from "@/types/product.types";

// ── Rich Text Toolbar ────────────────────────────────────────────────────────
function RichToolbar({ onCommand }: { onCommand: (cmd: string, val?: string) => void }) {
  const btn = (label: string, cmd: string, val?: string, title?: string) => (
    <button type="button" title={title ?? label}
      onMouseDown={(e) => { e.preventDefault(); onCommand(cmd, val); }}
      style={{ padding: "4px 8px", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, color: "#374151", borderRadius: "4px", lineHeight: 1 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
    >{label}</button>
  );

  const divider = () => <span style={{ width: "1px", height: "18px", background: "#e2e8f0", margin: "0 4px" }} />;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "6px 8px", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" }}>
      {btn("B",  "bold",         undefined, "Bold")}
      {btn("I",  "italic",       undefined, "Italic")}
      {btn("U",  "underline",    undefined, "Underline")}
      {btn("S",  "strikeThrough",undefined, "Strikethrough")}
      {divider()}
      {btn("≡",  "justifyLeft",  undefined, "Align Left")}
      {btn("≣",  "justifyFull",  undefined, "Justify")}
      {btn("≡→", "justifyRight", undefined, "Align Right")}
      {divider()}
      {btn("• List", "insertUnorderedList")}
      {btn("1. List", "insertOrderedList")}
      {divider()}
      <select onMouseDown={(e) => e.stopPropagation()} onChange={(e) => onCommand("formatBlock", e.target.value)}
        style={{ padding: "3px 6px", fontSize: "12px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#fff", color: "#374151" }}>
        <option value="p">Normal</option>
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
      </select>
    </div>
  );
}

// ── Tag Input ────────────────────────────────────────────────────────────────
function TagInput({ placeholder, tags, onChange }: { placeholder: string; tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");

  function add() {
    const val = input.trim();
    if (val && !tags.includes(val)) onChange([...tags, val]);
    setInput("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && !input && tags.length) onChange(tags.slice(0, -1));
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "6px 10px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", minHeight: "42px", alignItems: "center" }}>
      {tags.map((t) => (
        <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", background: "#eff6ff", color: "#3b5bdb", borderRadius: "99px", fontSize: "12px", fontWeight: 600 }}>
          {t}
          <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#3b5bdb", fontSize: "14px", lineHeight: 1, padding: 0 }}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={add}
        placeholder={tags.length === 0 ? placeholder : ""}
        style={{ border: "none", outline: "none", fontSize: "13px", color: "#1e293b", flex: 1, minWidth: "120px", background: "transparent" }}
      />
    </div>
  );
}

// ── Form Field ───────────────────────────────────────────────────────────────
function Field({ label, required, children, half }: { label: string; required?: boolean; children: React.ReactNode; half?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: half ? undefined : undefined }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
  fontSize: "13px", color: "#1e293b", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box",
};

// ── Main Component ───────────────────────────────────────────────────────────
export function AdminAddProductClient({ editProduct }: { editProduct?: any }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { createProduct, updateProduct, isLoading } = useProducts();
  const editorRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<CreateProductRequest>({
    name: editProduct?.name ?? "",
    slug: editProduct?.slug ?? "",
    description: editProduct?.description ?? "",
    shortDescription: editProduct?.shortDescription ?? "",
    price: editProduct?.price ?? 0,
    discountedPrice: editProduct?.discountedPrice ?? 0,
    stock: editProduct?.stock ?? 0,
    sku: editProduct?.sku ?? "",
    imageUrl: editProduct?.imageUrl ?? "",
    categoryId: editProduct?.categoryId ?? "",
    tags: editProduct?.tags ?? [],
    offers: editProduct?.offers ?? [],
    isActive: editProduct?.isActive ?? true,
  });
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
    CategoryService.getCategories({ limit: 100 }).then((res) => setCategories(res.data));
    if (editorRef.current && editProduct?.description) {
      editorRef.current.innerHTML = editProduct.description;
    }
  }, [isAuthenticated, user]);

  function execCmd(cmd: string, val?: string) {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  }

  function set(key: keyof CreateProductRequest, val: any) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccess("");

    const description = editorRef.current?.innerHTML ?? "";
    const payload = { ...form, description };

    if (!payload.name.trim()) { setErrorMsg("Title is required."); return; }
    if (!payload.categoryId)  { setErrorMsg("Please select a category."); return; }
    if (payload.price <= 0)   { setErrorMsg("Price must be greater than 0."); return; }

    let result;
    if (editProduct?.id) {
      result = await updateProduct(editProduct.id, payload);
    } else {
      result = await createProduct(payload);
    }

    if (result) {
      setSuccess(editProduct?.id ? "Product updated!" : "Product created successfully!");
      if (!editProduct?.id) router.push("/admin/products");
    } else {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AdminSidebar activePage="products" />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        <AdminTopBar title="Products" />

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "28px 32px", maxWidth: "860px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "24px" }}>
            {editProduct ? "Edit Product" : "Add Product"}
          </h2>

          {success  && <div style={{ padding: "10px 14px", background: "#f0fdf4", color: "#15803d", borderRadius: "8px", fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>{success}</div>}
          {errorMsg && <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#b91c1c", borderRadius: "8px", fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>{errorMsg}</div>}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Title */}
            <Field label="Title" required>
              <input value={form.name} onChange={(e) => { set("name", e.target.value); if (!editProduct) set("slug", autoSlug(e.target.value)); }}
                placeholder="Enter your product title.." style={inputStyle} />
            </Field>

            {/* Slug */}
            <Field label="Slug">
              <input value={form.slug} onChange={(e) => set("slug", e.target.value)}
                placeholder="this-is-sample-slug" style={inputStyle} />
            </Field>

            {/* Description — rich text */}
            <Field label="Description">
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                <RichToolbar onCommand={execCmd} />
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  style={{ minHeight: "120px", padding: "12px", fontSize: "13px", color: "#1e293b", outline: "none", lineHeight: 1.6 }}
                  onInput={() => {}}
                />
              </div>
            </Field>

            {/* Short Description + Category */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Short Description" required>
                <input value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)}
                  placeholder="Write short description" style={inputStyle} />
              </Field>
              <Field label="Category" required>
                <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}
                  style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                  <option value="">Select a category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
            </div>

            {/* Price + Discounted Price */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Price" required>
                <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => set("price", parseFloat(e.target.value) || 0)} style={inputStyle} />
              </Field>
              <Field label="Discounted Price">
                <input type="number" min="0" step="0.01" value={form.discountedPrice ?? 0} onChange={(e) => set("discountedPrice", parseFloat(e.target.value) || 0)} style={inputStyle} />
              </Field>
            </div>

            {/* Offers + Tags */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Enter Multiple Offers">
                <TagInput placeholder="Type and press enter..." tags={form.offers ?? []} onChange={(t) => set("offers", t)} />
              </Field>
              <Field label="Enter Multiple Tags">
                <TagInput placeholder="Type and press enter..." tags={form.tags ?? []} onChange={(t) => set("tags", t)} />
              </Field>
            </div>

            {/* SKU + Quantity */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="SKU">
                <input value={form.sku} onChange={(e) => set("sku", e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Quantity">
                <input type="number" min="0" value={form.stock} onChange={(e) => set("stock", parseInt(e.target.value) || 0)} style={inputStyle} />
              </Field>
            </div>

            {/* Image URL */}
            <Field label="Image URL">
              <input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg" style={inputStyle} />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="preview" style={{ marginTop: "8px", height: "80px", width: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
              )}
            </Field>

            {/* Active toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Active</label>
              <button type="button" onClick={() => set("isActive", !form.isActive)} style={{
                width: "44px", height: "24px", borderRadius: "99px", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s",
                background: form.isActive ? "#3b5bdb" : "#e2e8f0",
              }}>
                <span style={{
                  position: "absolute", top: "3px", left: form.isActive ? "23px" : "3px",
                  width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
                  transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </button>
              <span style={{ fontSize: "12px", color: "#64748b" }}>{form.isActive ? "Product is visible in store" : "Product is hidden from store"}</span>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
              <button type="submit" disabled={isLoading} style={{
                padding: "10px 24px", background: "#3b5bdb", color: "#fff", borderRadius: "8px",
                fontSize: "13px", fontWeight: 700, border: "none", cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}>
                {isLoading ? "Saving…" : editProduct ? "Update Product" : "Add Product"}
              </button>
              <button type="button" onClick={() => router.push("/admin/products")} style={{
                padding: "10px 20px", background: "#f8fafc", color: "#374151", borderRadius: "8px",
                fontSize: "13px", fontWeight: 600, border: "1px solid #e2e8f0", cursor: "pointer",
              }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
