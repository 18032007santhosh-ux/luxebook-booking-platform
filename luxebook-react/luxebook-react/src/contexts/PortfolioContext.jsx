import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext(null);
const STORAGE_KEY = "luxebook_portfolio";

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

export const PortfolioProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse portfolio items from localStorage", e);
      }
    }
    return initialItems;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => [item, ...prev]);
  };

  const updateItem = (id, updates) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFeatured = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  return (
    <PortfolioContext.Provider value={{ items, addItem, updateItem, deleteItem, toggleFeatured }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
