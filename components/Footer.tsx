import Link from "next/link";

const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "Press", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-surface w-full border-t border-on-surface/10" aria-label="Site footer">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top row — brand + nav links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 py-16">
          {/* Brand info */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="font-headline font-bold text-lg text-on-surface hover:opacity-80 transition-opacity"
              id="footer-logo"
            >
              TravStory
            </Link>
            <p className="font-body text-sm text-on-surface/60 max-w-xs leading-relaxed">
              Elevating travel through cinematic narrative and architectural
              design.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-8 md:gap-10">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-sm text-on-surface/60 hover:text-brand transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row — copyright */}
        <div className="border-t border-on-surface/10 py-8">
          <p className="font-body text-sm text-on-surface/40 text-center md:text-left">
            © {new Date().getFullYear()} Editorial Voyager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
