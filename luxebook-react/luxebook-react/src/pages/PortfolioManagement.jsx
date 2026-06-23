import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { usePortfolio } from "../contexts/PortfolioContext";

export default function PortfolioManagement() {
  const { items, addItem, deleteItem, toggleFeatured } = usePortfolio();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("hair");
  const [newIsFeatured, setNewIsFeatured] = useState(false);

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setNewTitle("");
      setNewCategory("hair");
      setNewIsFeatured(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadError("");
      setIsDragging(false);
    }
  }, [isModalOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleToggleFeatured = (id) => {
    toggleFeatured(id);
  };

  const processFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file format. Please upload JPG, PNG, WEBP, or TIFF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size is 5MB.");
      return;
    }

    setUploadError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !previewUrl) return;

    const categoryMap = {
      hair: "Hair Styling",
      facial: "Facial & Skin",
      spa: "Spa Interiors",
      wellness: "Wellness",
    };

    const newItem = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      categoryLabel: categoryMap[newCategory],
      type: `${categoryMap[newCategory]} • Bespoke Treatment`,
      isFeatured: newIsFeatured,
      image: previewUrl,
    };

    addItem(newItem);
    setIsModalOpen(false);
  };

  const filteredItems = (Array.isArray(items) ? items : []).filter((item) => {
    if (!item) return false;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col h-screen w-80 fixed left-0 top-0 bg-surface dark:bg-surface-dim border-r border-outline-variant/20 shadow-xl z-50">
        <div className="px-lg py-lg flex flex-col gap-md h-full">
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container">diamond</span>
            </div>
            <div>
              <Link to="/home" className="font-display-lg text-headline-md text-primary tracking-tight leading-none block">
                LuxeBook Admin
              </Link>
              <p className="font-label-caps text-on-surface-variant/60 uppercase text-[10px]">Elite Concierge</p>
            </div>
          </div>
          <nav className="flex flex-col gap-sm flex-grow">
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="/admin/dashboard"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-body-md">Overview</span>
            </Link>
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="/appointments"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-body-md">Appointments</span>
            </Link>
            <Link
              className="flex items-center gap-sm bg-primary-container/10 text-primary rounded-lg px-md py-sm border-l-4 border-primary transition-all font-bold"
              to="/admin/portfolio"
            >
              <span className="material-symbols-outlined">collections</span>
              <span className="font-body-md">Admin</span>
            </Link>
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="/explore"
            >
              <span className="material-symbols-outlined">badge</span>
              <span className="font-body-md">Staff</span>
            </Link>
            <a
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all cursor-pointer"
              onClick={(e) => { e.preventDefault(); toast("Customers feature coming soon."); }}
            >
              <span className="material-symbols-outlined">group</span>
              <span className="font-body-md">Customers</span>
            </a>
            <a
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all cursor-pointer"
              onClick={(e) => { e.preventDefault(); toast("Analytics feature coming soon."); }}
            >
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-body-md">Analytics</span>
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-sm border-t border-outline-variant/20 pt-lg">
            <a className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Support portal coming soon."); }}>
              <span className="material-symbols-outlined">help</span>
              <span className="font-body-md">Support</span>
            </a>
            <a
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all cursor-pointer"
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md">Logout</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-80 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-lg py-sm w-full bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
          <h1 className="font-display-lg text-headline-md md:text-headline-lg text-primary tracking-tight font-bold">
            Portfolio Management
          </h1>
          <div className="flex items-center gap-md">
            <div className="relative hidden lg:block">
              <input
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full text-body-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
                placeholder="Search gallery..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">
                search
              </span>
            </div>
            <div className="flex gap-sm">
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant/70 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/50">
                <img
                  alt="Administrator Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAHJ_YqFbeorUWY_Ebt87q3JtSxG_fWnaeVGf_yXPtvyxU4NF0-AzZIpxUpCElH3m-vDHyOnuZPEy_-edUXQYgccTvcK0xsJlqYBFUEeD34l4SbSNV72GPYRs8WhgJHLrvLShgBu5FBJJ6HY5KS9w0vc4v-QKGU7h2W6MZkMnB_6oFWTbM6uAr_kCvNw8GhOpPq7kYG4_uwBIykoOV2K2S_D65_7RhKDMIGqYku5ELd7o4lRHXtWMGSvKi9wbQ8vFFh_m8VEKcVwg"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-lg max-w-container-max mx-auto">
          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">
            <div className="glass-card p-lg rounded-2xl flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-label-caps text-on-surface-variant/60 uppercase text-xs">Total Views</span>
                <span className="material-symbols-outlined text-primary/40">visibility</span>
              </div>
              <div className="flex items-end gap-xs">
                <p className="font-display-lg text-headline-xl leading-none text-2xl font-bold">{(Array.isArray(items) ? items.length : 0) * 2.4}k</p>
                <span className="text-emerald-green font-bold text-body-sm mb-1 text-sm">+8%</span>
              </div>
            </div>
            <div className="glass-card p-lg rounded-2xl flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-label-caps text-on-surface-variant/60 uppercase text-xs">Engagement Rate</span>
                <span className="material-symbols-outlined text-primary/40">favorite</span>
              </div>
              <div className="flex items-end gap-xs">
                <p className="font-display-lg text-headline-xl leading-none text-2xl font-bold">4.2%</p>
                <span className="text-emerald-green font-bold text-body-sm mb-1 text-sm">+1.2%</span>
              </div>
            </div>
            <div className="glass-card p-lg rounded-2xl flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-label-caps text-on-surface-variant/60 uppercase text-xs">Featured Slots</span>
                <span className="material-symbols-outlined text-primary/40">star</span>
              </div>
              <div className="flex items-end gap-xs">
                <p className="font-display-lg text-headline-xl leading-none text-2xl font-bold">
                  {(Array.isArray(items) ? items : []).filter((item) => item && item.isFeatured).length}/12
                </p>
                <span className="text-on-surface-variant/40 text-body-sm mb-1 text-sm">Active</span>
              </div>
            </div>
            <div className="glass-card p-lg rounded-2xl flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="font-label-caps text-on-surface-variant/60 uppercase text-xs">Inquiries Generated</span>
                <span className="material-symbols-outlined text-primary/40">chat_bubble</span>
              </div>
              <div className="flex items-end gap-xs">
                <p className="font-display-lg text-headline-xl leading-none text-2xl font-bold">89</p>
                <span className="text-emerald-green font-bold text-body-sm mb-1 text-sm">+14</span>
              </div>
            </div>
          </section>

          {/* Portfolio Controls & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-md">
            <div className="flex items-center gap-sm overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              {[
                { id: "all", label: "All Work" },
                { id: "hair", label: "Hair Styling" },
                { id: "facial", label: "Facial & Skin" },
                { id: "spa", label: "Spa Interiors" },
                { id: "wellness", label: "Wellness" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-md py-sm rounded-full font-label-caps uppercase text-xs whitespace-nowrap transition-colors duration-300 ${
                    selectedCategory === filter.id
                      ? "bg-primary text-on-primary font-semibold"
                      : "bg-surface-container-high/50 text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-xs px-lg py-sm bg-emerald-green text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:opacity-90 transition-all scale-95 hover:scale-100 whitespace-nowrap"
            >
              <span className="material-symbols-outlined">add</span>
              Upload New Work
            </button>
          </div>

          {/* Bento Portfolio Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:scale-[1.01] ${
                  item.isLarge ? "lg:col-span-2 h-[500px]" : "h-[500px]"
                }`}
              >
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-lg w-full flex justify-between items-end z-10">
                  <div>
                    {item.isFeatured && (
                      <span className="bg-rich-gold/20 text-rich-gold border border-rich-gold/40 px-sm py-1 rounded-full text-[10px] font-label-caps uppercase mb-sm inline-block">
                        Featured
                      </span>
                    )}
                    <h3 className="font-headline-lg text-white mb-xs text-xl font-bold">{item.title}</h3>
                    <p className="text-white/70 font-body-sm text-sm">{item.type}</p>
                  </div>
                  <div className="flex gap-sm">
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
                        item.isFeatured
                          ? "bg-rich-gold text-[#002019] border-rich-gold"
                          : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
                      }`}
                      title={item.isFeatured ? "Unfeature Item" : "Feature Item"}
                    >
                      <span className="material-symbols-outlined">star</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-error transition-all"
                      title="Delete Item"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-xl text-center glass-card rounded-2xl p-lg">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-md">info</span>
                <p className="font-body-lg text-on-surface-variant">No items found matching the current filters.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Upload Glassmorphic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/40 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl rounded-2xl overflow-hidden animate-fade-in-up">
            <div className="p-lg flex justify-between items-center border-b border-outline-variant/20">
              <h2 className="font-headline-md text-primary text-xl font-bold">Upload Portfolio Work</h2>
              <button
                className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUploadSubmit}>
              <div className="p-lg space-y-lg">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png, image/webp, image/tiff"
                  className="hidden"
                />
                
                {previewUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 h-64 group bg-surface-container-low">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-md py-sm bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full font-bold transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">swap_horiz</span>
                        Replace Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`border-2 border-dashed rounded-2xl p-xl flex flex-col items-center justify-center gap-md transition-colors cursor-pointer ${
                      isDragging ? "border-primary bg-primary/5" : "border-outline-variant/50 hover:border-primary/50 bg-surface/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary pointer-events-none">
                      <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                    </div>
                    <div className="text-center pointer-events-none">
                      <p className="font-body-lg font-bold text-base">Drag & drop high-fidelity images</p>
                      <p className="font-body-sm text-on-surface-variant/60 text-xs mt-1">
                        Supported formats: WEBP, TIFF, PNG, JPG (Max 5MB)
                      </p>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="px-lg py-sm border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-colors text-xs"
                    >
                      Browse Files
                    </button>
                  </div>
                )}
                {uploadError && (
                  <p className="text-error text-sm mt-1 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {uploadError}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="space-y-xs flex flex-col">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1">
                      Project Title
                    </label>
                    <input
                      className="px-md py-sm bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-all"
                      placeholder="e.g. Diamond Cut Collection"
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-xs flex flex-col">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1">
                      Service Category
                    </label>
                    <select
                      className="px-md py-sm bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-all"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option value="hair">Hair Styling</option>
                      <option value="facial">Facial & Skin</option>
                      <option value="spa">Spa Interiors</option>
                      <option value="wellness">Wellness</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <input
                    className="w-5 h-5 rounded border-outline-variant text-emerald-green focus:ring-emerald-green"
                    id="featureCheck"
                    type="checkbox"
                    checked={newIsFeatured}
                    onChange={(e) => setNewIsFeatured(e.target.checked)}
                  />
                  <label className="font-body-md text-on-surface-variant text-sm" htmlFor="featureCheck">
                    Mark as Featured on Landing Page
                  </label>
                </div>
              </div>
              <div className="p-lg bg-surface-container-low/50 flex justify-end gap-md">
                <button
                  type="button"
                  className="px-lg py-sm font-bold text-on-surface-variant/60 hover:text-on-surface transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className={`px-xl py-sm rounded-full font-bold shadow-lg transition-all ${
                    selectedFile 
                      ? "bg-emerald-green text-white hover:shadow-xl" 
                      : "bg-surface-container-high text-on-surface-variant/50 cursor-not-allowed"
                  }`}
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 px-md py-xs flex justify-around items-center z-50">
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2" to="/home">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-label-caps uppercase">Home</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2" to="/appointments">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] font-label-caps uppercase">Book</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-primary p-2" to="/admin/portfolio">
          <span className="material-symbols-outlined">collections</span>
          <span className="text-[10px] font-label-caps uppercase font-bold">Admin</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2" to="/explore">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-label-caps uppercase">Users</span>
        </Link>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2 cursor-pointer" onClick={(e) => { e.preventDefault(); toast("Settings feature coming soon."); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-label-caps uppercase">Set</span>
        </a>
      </nav>
    </div>
  );
}
