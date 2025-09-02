import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  CreditCard,
  Home,
  ShoppingBag,
  Shirt,
  Speech,
  Baby,
  Watch,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

// Import the same navigation configuration from your header
import { shopingHeaderNav } from "./Navigation";

const currentYear = new Date().getFullYear();

export default function PagesFooter({
  brand = "SomZuuq Mrkt",

  tagline = "Quality • Value • Fast Delivery",
}) {
  const navigate = useNavigate();

  const handleFooterNavigate = (item) => {
    const id = item.id.toLowerCase();
    const isFilterable = !["home", "products"].includes(id);

    if (isFilterable) {
      const filter = { category: [id] };
      sessionStorage.setItem("filters", JSON.stringify(filter));
      navigate(`/shop/products?category=${id}`);
    } else {
      navigate(item.path);
    }
  };

  return (
    <footer className="relative mt-16 bg-[#06143A] text-slate-200 border-t border-white/10">
      {/* Top highlight bar */}

      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400" />
      {/* Invayl course promo */}
      <CoursePromo />
      {/* Grid */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + USP badges */}
          <div>
            <Link to="/shop/home" className="inline-flex items-center gap-2">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr
               from-indigo-500 to-sky-500 shadow"
              >
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold">{brand}</span>
            </Link>

            <p className="mt-3 text-sm text-slate-300/80 max-w-xs">{tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge icon={<Truck className="w-3.5 h-3.5" />}>
                Fast Shipping
              </Badge>
              <Badge icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Secure Checkout
              </Badge>
              <Badge icon={<CreditCard className="w-3.5 h-3.5" />}>
                Multiple Payments
              </Badge>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <Social to="#" label="Facebook">
                <Facebook className="w-4 h-4" />
              </Social>
              <Social to="#" label="Twitter">
                <Twitter className="w-4 h-4" />
              </Social>
              <Social to="#" label="Instagram">
                <Instagram className="w-4 h-4" />
              </Social>
              <Social to="#" label="YouTube">
                <Youtube className="w-4 h-4" />
              </Social>
              <Social to="#" label="GitHub">
                <Github className="w-4 h-4" />
              </Social>
            </div>
          </div>

          {/* Shop (built from your nav) */}
          <div>
            <FooterCol title="Shop">
              <ul className="space-y-2">
                {shopingHeaderNav.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleFooterNavigate(item)}
                      className="group inline-flex items-center gap-2 text-slate-300 hover:text-white w-full text-left"
                    >
                      {item.icon}
                      <span className="capitalize">{item.label}</span>
                      <span className="w-0 group-hover:w-8 transition-all h-px bg-slate-300/50" />
                    </button>
                  </li>
                ))}
              </ul>
            </FooterCol>
          </div>

          {/* Support */}
          <div>
            <FooterCol title="Support">
              <ul className="space-y-2">
                <FooterLink to="#">Help Center</FooterLink>
                <FooterLink to="#">Track Order</FooterLink>
                <FooterLink to="#">Returns & Refunds</FooterLink>
                <FooterLink to="#">Shipping Info</FooterLink>
                <FooterLink to="#">Contact Us</FooterLink>
              </ul>
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                <div className="inline-flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  Doha, Qatar
                </div>
                <a
                  href="tel:+97400000000"
                  className="inline-flex items-start gap-2 text-slate-300 hover:text-white"
                >
                  <Phone className="w-4 h-4 mt-0.5" />
                  +974 77237879
                </a>
                <a
                  href="mailto:support@somzuuq.com"
                  className="inline-flex items-start gap-2 text-slate-300 hover:text-white"
                >
                  <Mail className="w-4 h-4 mt-0.5" />
                  support@somzuuq.com
                </a>
              </div>
            </FooterCol>
          </div>

          {/* Newsletter */}
          <div>
            <FooterCol title="Get updates & offers">
              <p className="text-sm text-slate-300/80 mb-3">
                Join our newsletter for new arrivals, exclusive deals, and tips.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-sm items-center space-x-2"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/10 placeholder:text-slate-300/60 text-slate-100"
                  required
                />
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500"
                >
                  Subscribe
                </Button>
              </form>

              {/* Payment badges (visual only) */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <PayBadge>Visa</PayBadge>
                <PayBadge>Mastercard</PayBadge>
                <PayBadge>PayPal</PayBadge>
                <PayBadge>Apple&nbsp;Pay</PayBadge>
                <PayBadge>Google&nbsp;Pay</PayBadge>
              </div>
            </FooterCol>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-slate-300/80">
          <p>
            © {currentYear} {brand}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <BottomLink to="#">Privacy</BottomLink>
            <Dot />
            <BottomLink to="#">Terms</BottomLink>
            <Dot />
            <BottomLink to="#">Sitemap</BottomLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------
 * Small presentational bits
 * ------------------------*/

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="text-base font-semibold tracking-wide text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-slate-300 hover:text-white inline-flex items-center gap-1"
      >
        <span>{children}</span>
      </Link>
    </li>
  );
}

function BottomLink({ to, children }) {
  return (
    <Link to={to} className="hover:text-white">
      {children}
    </Link>
  );
}

function Dot() {
  return <span className="opacity-50">•</span>;
}

function Social({ to, label, children }) {
  return (
    <a
      href={to}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition"
    >
      {children}
    </a>
  );
}

function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 border border-white/10">
      {icon}
      {children}
    </span>
  );
}

function PayBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium tracking-wide">
      {children}
    </span>
  );
}

function CoursePromo() {
  return (
    <div className="px-4">
      <div className="container">
        <div className="mt-4 mb-1 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-500">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold">
                Project-kan waa course rasmi ah oo ka mid ah{" "}
                <span className="text-sky-300">Invayl</span>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300/80">
                This exact e-commerce project is available as a full Invayl
                course — step-by-step lessons & source code.
              </p>
            </div>
            <Button asChild className="bg-slate-700 hover:bg-slate-600">
              <a
                href="https://www.invayl.com/course/details/e-commerce-full-stack-project-2052-6889d658784d8266cfd973f1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Invayl course in a new tab"
              >
                View Course
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
