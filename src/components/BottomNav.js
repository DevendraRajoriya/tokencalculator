"use client";

import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Calculator", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="9" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="9" y2="15"/><line x1="15" y1="15" x2="15" y2="15"/>
    </svg>
  ), path: "/" },
  { label: "Pricing", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ), path: "/llm-pricing-comparison" },
  { label: "Blog", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ), path: "/blog" },
  { label: "API", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ), path: "/api/docs" },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <a
              key={item.path}
              href={item.path}
              className={`bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
            >
              <div className="bottom-nav__icon">{item.icon}</div>
              <span className="bottom-nav__label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
