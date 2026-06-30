import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/teams" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Products: [
    { label: "Food Grains", href: "/products?category=grains" },
    { label: "Spices", href: "/products?category=spices" },
    { label: "Peanut Butter", href: "/products?category=peanut-butter" },
    { label: "All Products", href: "/products" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="FEDORG Naturals"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              Bringing you the finest food grains, aromatic spices, and
              wholesome peanut butter — straight from the farm to your table.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>fedorg@fedorg.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>7510209632</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Karnataka, India</span>
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-primary-800/40 bg-primary-950/40 p-3 text-sm text-primary-100">
              <p className="font-semibold mb-1">Sabbath Notice</p>
              <p>
                Friday 6:30 PM to Saturday 7:00 PM, the website will be
                observing Sabbath. Please do not place orders during this
                period.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FEDORG. All rights reserved.</p>
          <p>Made with 🌿 in India</p>
        </div>
      </div>
    </footer>
  );
}
