import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f7f8fc] border-t border-[#e8ecf0] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14">

        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#e8ecf0]">

          {/* Brand — spans full width on mobile/tablet, first col on lg */}
          <div className="col-span-2 lg:col-span-1">
            {/* Brand logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#3c50e0] rounded-[7px] flex items-center justify-center text-white flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <span className="text-xl font-extrabold text-[#1a1a2e] tracking-tight">StoreFront</span>
            </div>

            <p className="text-sm text-[#6b7280] leading-relaxed mt-3 mb-4">
              Your premier destination for quality products. We curate the finest selection to meet your everyday needs.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-start gap-2 text-[13px] text-[#6b7280]">
                <svg className="flex-shrink-0 mt-0.5 text-[#3c50e0]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                685 Market Street, New York, NY 10001
              </div>
              <div className="flex items-start gap-2 text-[13px] text-[#6b7280]">
                <svg className="flex-shrink-0 mt-0.5 text-[#3c50e0]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.46 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +1 (555) 123-4567
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-white border-[1.5px] border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#3c50e0] hover:border-[#3c50e0] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-white border-[1.5px] border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#3c50e0] hover:border-[#3c50e0] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-white border-[1.5px] border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#3c50e0] hover:border-[#3c50e0] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-white border-[1.5px] border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#3c50e0] hover:border-[#3c50e0] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[15px] font-bold text-[#1a1a2e] mb-5 relative after:block after:w-7 after:h-0.5 after:bg-[#3c50e0] after:rounded after:mt-2">
              Quick Links
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Shop</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Popular</Link></li>
              <li><Link href="/cart" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Cart</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[15px] font-bold text-[#1a1a2e] mb-5 relative after:block after:w-7 after:h-0.5 after:bg-[#3c50e0] after:rounded after:mt-2">
              Account
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><Link href="/user" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">My Account</Link></li>
              <li><Link href="/auth/login" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Sign In</Link></li>
              <li><Link href="/auth/register" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Register</Link></li>
              <li><Link href="/user/orders" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">My Orders</Link></li>
              <li><Link href="/user/change-password" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Change Password</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[15px] font-bold text-[#1a1a2e] mb-5 relative after:block after:w-7 after:h-0.5 after:bg-[#3c50e0] after:rounded after:mt-2">
              Help &amp; Support
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Help Center</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Refund Policy</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">Terms of Use</Link></li>
              <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#3c50e0] hover:translate-x-1 transition-all inline-block">FAQs</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-5 gap-4">
          <p className="text-sm text-[#9ca3af] m-0">© {currentYear} StoreFront. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Visa */}
            <div className="rounded overflow-hidden flex items-center drop-shadow-sm hover:-translate-y-px transition-transform" title="Visa">
              <svg viewBox="0 0 48 32" width="40" height="26" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                <text x="8" y="22" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white">VISA</text>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="rounded overflow-hidden flex items-center drop-shadow-sm hover:-translate-y-px transition-transform" title="Mastercard">
              <svg viewBox="0 0 48 32" width="40" height="26" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e7eb"/>
                <circle cx="18" cy="16" r="9" fill="#EB001B"/>
                <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
                <path d="M24 9.27a9 9 0 0 1 0 13.46A9 9 0 0 1 24 9.27z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* PayPal */}
            <div className="rounded overflow-hidden flex items-center drop-shadow-sm hover:-translate-y-px transition-transform" title="PayPal">
              <svg viewBox="0 0 48 32" width="40" height="26" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e7eb"/>
                <text x="6" y="21" fontFamily="Arial" fontSize="11" fontWeight="bold" fill="#003087">Pay</text>
                <text x="20" y="21" fontFamily="Arial" fontSize="11" fontWeight="bold" fill="#009cde">Pal</text>
              </svg>
            </div>
            {/* Apple Pay */}
            <div className="rounded overflow-hidden flex items-center drop-shadow-sm hover:-translate-y-px transition-transform" title="Apple Pay">
              <svg viewBox="0 0 48 32" width="40" height="26" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#000"/>
                <text x="6" y="21" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="white">Apple</text>
                <text x="6" y="28" fontFamily="Arial" fontSize="7" fill="white">Pay</text>
              </svg>
            </div>
            {/* Google Pay */}
            <div className="rounded overflow-hidden flex items-center drop-shadow-sm hover:-translate-y-px transition-transform" title="Google Pay">
              <svg viewBox="0 0 48 32" width="40" height="26" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e7eb"/>
                <text x="5" y="20" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#4285F4">G</text>
                <text x="13" y="20" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#34A853">o</text>
                <text x="20" y="20" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#EA4335">o</text>
                <text x="27" y="20" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#FBBC05">g</text>
                <text x="5" y="28" fontFamily="Arial" fontSize="7" fill="#5f6368">Pay</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
