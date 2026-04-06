"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCategory } from "@/hooks/useCategory";
import { AdminSidebar, AdminTopBar } from "./AdminChrome";
import type { CreateCategoryRequest } from "@/services/api/category.service";

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
export function AdminAddCategoryClient({ editCategory }: { editCategory?: any }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { createCategory, updateCategory, isLoading } = useCategory();

  const [form, setForm] = useState<CreateCategoryRequest>({
    name: editCategory?.name ?? "",
    description: editCategory?.description ?? "",
    slug: editCategory?.slug ?? "",
    imageUrl: editCategory?.imageUrl ?? "",
    isActive: editCategory?.isActive ?? true,
  });
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
  }, [isAuthenticated, user]);

  function set(key: keyof CreateCategoryRequest, val: any) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccess("");

    if (!form.name.trim()) { setErrorMsg("Name is required."); return; }

    let result;
    if (editCategory?.id) {
      result = await updateCategory(editCategory.id, form);
    } else {
      result = await createCategory(form);
    }

    if (result) {
      setSuccess(editCategory?.id ? "Category updated!" : "Category created successfully!");
      if (!editCategory?.id) router.push("/admin/categories");
    } else {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AdminSidebar activePage="categories" />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        <AdminTopBar title="Categories" />

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "28px 32px", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "24px" }}>
            {editCategory ? "Edit Category" : "Add Category"}
          </h2>

          {success  && <div style={{ padding: "10px 14px", background: "#f0fdf4", color: "#15803d", borderRadius: "8px", fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>{success}</div>}
          {errorMsg && <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#b91c1c", borderRadius: "8px", fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>{errorMsg}</div>}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Name */}
            <Field label="Name" required>
              <input value={form.name} onChange={(e) => { set("name", e.target.value); if (!editCategory) set("slug", autoSlug(e.target.value)); }}
                placeholder="Enter category name.." style={inputStyle} />
            </Field>

            {/* Slug */}
            <Field label="Slug">
              <input value={form.slug} onChange={(e) => set("slug", e.target.value)}
                placeholder="this-is-sample-slug" style={inputStyle} />
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Enter category description.." rows={4} style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} />
            </Field>

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
              <span style={{ fontSize: "12px", color: "#64748b" }}>{form.isActive ? "Category is visible in store" : "Category is hidden from store"}</span>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
              <button type="submit" disabled={isLoading} style={{
                padding: "10px 24px", background: "#3b5bdb", color: "#fff", borderRadius: "8px",
                fontSize: "13px", fontWeight: 700, border: "none", cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}>
                {isLoading ? "Saving…" : editCategory ? "Update Category" : "Add Category"}
              </button>
              <button type="button" onClick={() => router.push("/admin/categories")} style={{
                padding: "10px 24px", background: "#fff", color: "#374151", border: "1px solid #e2e8f0", borderRadius: "8px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
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
