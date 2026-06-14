import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// A utility function to join classNames, typical in shadcn/ui.
// Since we don't have the clsx/tailwind-merge setup, a simple string join works for this component.
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AnimatedNavigationTabs({ items }) {
  const location = useLocation();
  const [active, setActive] = useState(items[0]);
  const [isHover, setIsHover] = useState(null);

  // Sync active tab with current route
  useEffect(() => {
    const currentItem = items.find((item) => location.pathname.startsWith(item.path));
    if (currentItem) {
      setActive(currentItem);
    }
  }, [location.pathname, items]);

  return (
    <div className="relative">
      <ul className="flex items-center justify-center m-0 p-0">
        {items.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={cn(
              "py-2 relative duration-300 transition-colors hover:!text-primary block",
              active.id === item.id ? "text-primary" : "text-on-surface/70"
            )}
            onClick={() => setActive(item)}
            onMouseEnter={() => setIsHover(item)}
            onMouseLeave={() => setIsHover(null)}
          >
            <div className="px-5 py-2 relative font-label-caps tracking-wider text-sm">
              {item.title}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover-bg"
                  className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                  style={{
                    borderRadius: 6,
                  }}
                />
              )}
            </div>
            {active.id === item.id && (
              <motion.div
                layoutId="active"
                className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
              />
            )}
            {isHover?.id === item.id && (
              <motion.div
                layoutId="hover"
                className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
              />
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
}
