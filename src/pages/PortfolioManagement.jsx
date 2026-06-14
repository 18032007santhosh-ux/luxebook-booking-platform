import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const initialItems = [
  {
    id: 1,
    title: "Zen Sanctuary Presidential Suite",
    category: "spa",
    categoryLabel: "Spa Interiors",
    type: "Interior Design • Wellness Experience",
    isLarge: true,
    isFeatured: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACGNCzlOLuhr1fZGo74CvqV_ZphalIczw0Yo7UJo7bkBPTQfR4qbpTmmeGv7FUuu_Pb8ZjoYvnNSJtFKeaRS7-UM_LYD1ZWNLkmx4JIjtXm9r7nF1y6_E1xTXVWH74ocnEUhgnQp4fFsJso10yRf5fWDc_jCwZtIWHDlFj4W7PYNR9yEuH7u4ojAKXPE5A0tX69e0S9_Aq6R10NUxESJz1qr--gxNLbJp14C5_vj64789p_0OAg7G3Au-W0itPfUP4lhFeJTCnKz0",
  },
  {
    id: 2,
    title: "Royal Bridal Collection",
    category: "hair",
    categoryLabel: "Hair Styling",
    type: "Hair Styling • Weddings",
    isPortrait: true,
    isFeatured: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVG247jbKbfcVZQqpx0Eor5M5lc9Y3Qjr_nQ6VgHgRKmRfhsSQKliA-OhY9ePboE0V344T4u8uxirEslFi4aksulFzYH5LAqhqFsDWilCxbJlEGT5vC26YfG6bQnuOqec3_ixD5r8sCVAmXHSFTPcvlPaDgJys2zE4dg27a3TEIWAIuzkUGHfmS3WIlhDxp_L23e6p-BJkaYdJUEqjCn_Z_pUOuksLTVZRL1xzFoGgH6x27ENZE5VBd9ABI3Unw_0I53KG8gRDFOI",
  },
  {
    id: 3,
    title: "24K Gold Rejuvenation",
    category: "facial",
    categoryLabel: "Facial & Skin",
    type: "Skincare • Anti-Aging",
    isFeatured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASa2AmPcT8odReoqQRL100s6u-0yPyGh86wRq344CLLZ4w6Lw5QcD87OiEj-F9ERSgerwrdC3pan4qLIdH0xjesOtH3USDTMBNqvgOX4-DrtXG2CEB49x4CqjixPtobbZy0RAODyBVL54KXYVtOHz43Nbk4hmZmg4hbT2oHl7079F4ec5rKm3l9tLeNHAQ4jzDlUvz9DkPRMcZXBSm0_hTmF1NdIpWZscGPiC6mJ3LgTIMNkRuRdTqy2hpKbBHKyokcuBFmsjTdco",
  },
  {
    id: 4,
    title: "Obsidian Stone Therapy",
    category: "wellness",
    categoryLabel: "Wellness",
    type: "Massage • Relaxation",
    isFeatured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9bokfkgrxoQb3sJfjxN4Oem4I5H3pwa-pfTOOnwKGo1UWwPzSyWoWTTALPktyH8vHOqs7hsaEOQtn5eHZPq_-Q_8-OBqr8eHHfLkrAG2D7IyIjQsZxSFcDnfBmi82aT4sDRjGmFnZx0LHC8NKUAK6RFsbaBmNxjxW-O0_qqeTeS9RO1HZcutbIIrxktOv7lKyqRNS6rZOTbYSl2zmRJz_9C5cAB__yeJanPx_hkxB_prwyu4tevFhai2Ieflz2UOkWYlbM1A_FYo",
  },
  {
    id: 5,
    title: "Bespoke Fragrance Bar",
    category: "wellness",
    categoryLabel: "Wellness",
    type: "Experience • Personalized",
    isFeatured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-3qUzQjuvLdef_aSGBwp-rHiLiuNU5l3fMEJfWo9Wbd4dHQA-TTgRdDGEg7BK4dBpBhxjkEq77jirFGPGqNb9RW_1oSKF8XYHwZ4CF8CPSpwHG6ZzxfRZ_O2-N2X8vRIz9ItewcbuIK0jQJU-nQjvVcF1xcskni5q76jgt-l408lhwUZEjS80H9WkkxlGwzi5cW_m0oNQdN4q_YhAj_2245jdXYl4auQJumxcylq-zySu0w3J3ohbSN3S7xPcAQB-tEEwIT1xCuo",
  },
];

export default function PortfolioManagement() {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("hair");
  const [newIsFeatured, setNewIsFeatured] = useState(false);

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
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleFeatured = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;

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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACGNCzlOLuhr1fZGo74CvqV_ZphalIczw0Yo7UJo7bkBPTQfR4qbpTmmeGv7FUuu_Pb8ZjoYvnNSJtFKeaRS7-UM_LYD1ZWNLkmx4JIjtXm9r7nF1y6_E1xTXVWH74ocnEUhgnQp4fFsJso10yRf5fWDc_jCwZtIWHDlFj4W7PYNR9yEuH7u4ojAKXPE5A0tX69e0S9_Aq6R10NUxESJz1qr--gxNLbJp14C5_vj64789p_0OAg7G3Au-W0itPfUP4lhFeJTCnKz0", // Default beautiful placeholder
    };

    setItems([newItem, ...items]);
    setNewTitle("");
    setNewCategory("hair");
    setNewIsFeatured(false);
    setIsModalOpen(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
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
              to="/book"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-body-md">Appointments</span>
            </Link>
            <Link
              className="flex items-center gap-sm bg-primary-container/10 text-primary rounded-lg px-md py-sm border-l-4 border-primary transition-all font-bold"
              to="/admin/portfolio"
            >
              <span className="material-symbols-outlined">collections</span>
              <span className="font-body-md">Portfolio</span>
            </Link>
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="/explore"
            >
              <span className="material-symbols-outlined">badge</span>
              <span className="font-body-md">Staff</span>
            </Link>
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="#"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="font-body-md">Customers</span>
            </Link>
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="#"
            >
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-body-md">Analytics</span>
            </Link>
          </nav>
          <div className="mt-auto flex flex-col gap-sm border-t border-outline-variant/20 pt-lg">
            <a className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all" href="#">
              <span className="material-symbols-outlined">help</span>
              <span className="font-body-md">Support</span>
            </a>
            <Link
              className="flex items-center gap-sm text-on-surface-variant/60 hover:bg-surface-container-high/50 rounded-lg px-md py-sm transition-all"
              to="/login"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md">Logout</span>
            </Link>
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
                <p className="font-display-lg text-headline-xl leading-none text-2xl font-bold">12.4k</p>
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
                  {items.filter((item) => item.isFeatured).length}/12
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
                <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-xl flex flex-col items-center justify-center gap-md hover:border-primary/50 transition-colors cursor-pointer bg-surface/50">
                  <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                  </div>
                  <div className="text-center">
                    <p className="font-body-lg font-bold text-base">Drag & drop high-fidelity images</p>
                    <p className="font-body-sm text-on-surface-variant/60 text-xs">
                      Supported formats: RAW, TIFF, PNG, JPG (Max 50MB)
                    </p>
                  </div>
                  <button type="button" className="px-lg py-sm border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-colors text-xs">
                    Browse Files
                  </button>
                </div>
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
                  className="px-xl py-sm bg-emerald-green text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
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
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2" to="/book">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] font-label-caps uppercase">Book</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-primary p-2" to="/admin/portfolio">
          <span className="material-symbols-outlined">collections</span>
          <span className="text-[10px] font-label-caps uppercase font-bold">Port</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2" to="/explore">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-label-caps uppercase">Users</span>
        </Link>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant/50 p-2" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-label-caps uppercase">Set</span>
        </a>
      </nav>
    </div>
  );
}
