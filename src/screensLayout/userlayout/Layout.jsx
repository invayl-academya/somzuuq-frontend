import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-900">
      {/* Left brand panel (shown on lg+) */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-12 text-slate-100">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Brand header */}
        <header className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
              {/* Simple cart icon */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6l-1-3H2" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="17" cy="20" r="1.5" />
              </svg>
            </span>
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-white">Somzuuq</span>{" "}
              <span className="text-cyan-300">MRKT</span>
            </h1>
          </div>
          <p className="mt-6 max-w-md text-slate-300">
            Welcome to{" "}
            <span className="font-semibold text-white">Somzuuq MRKT</span> — a
            modern marketplace experience built for speed, trust, and growth.
          </p>
        </header>

        {/* Selling points */}
        <section className="relative z-10 mt-8 space-y-4">
          {[
            "Fast, mobile-first checkout",
            "Secure payments & buyer protection",
            "Somali-first marketplace experience",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-slate-200/90"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/20 ring-1 ring-emerald-300/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </section>

        {/* Footer note */}
        <footer className="relative z-10 text-sm text-slate-400">
          © {new Date().getFullYear()} Somzuuq MRKT. All rights reserved.
        </footer>
      </aside>

      {/* Right content panel */}
      <main
        className="relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8
                   bg-[radial-gradient(ellipse_at_top,_rgba(15,23,42,0.04),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(148,163,184,0.06),_transparent_60%)]"
        aria-label="Main content"
      >
        {/* Card wrapper for routed pages (forms, tables, etc.) */}
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 sm:p-8">
            {/* Optional mini-brand for small screens */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h1 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
                Somzuuq{" "}
                <span className="text-cyan-600 dark:text-cyan-400">MRKT</span>
              </h1>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Welcome back
              </span>
            </div>

            {/* Routed view */}
            <Outlet />
          </div>

          {/* Subtext */}
          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            By continuing you agree to our{" "}
            <a href="#" className="underline underline-offset-2">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default Layout;
