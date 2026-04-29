import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaGooglePlay,
  FaChevronRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
} from 'react-icons/fa';
import { cn } from '../../lib/utils';
import api from '../../utils/api';

const PHONE       = '+91 99889 49969';
const PHONE_TEL   = 'tel:+919988949969';
const WA_NUMBER   = '+91 90419 73105';
const WA_URL      = 'https://wa.me/919041973105';
const EMAIL       = 'samarth.academy2006@gmail.com';
const ADDRESS     = 'SCF 68, UT Market, Opp. GNDU, Amritsar';

const SOCIAL = [
  { href: 'https://www.facebook.com/samarthacademy2006',  icon: FaFacebookF, label: 'Facebook' },
  { href: 'https://www.instagram.com/gyanm.samarth.academy?igsh=MTB0NnI5dTliNDlicA%3D%3D', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://youtube.com/@samarth.academyy?si=N6X6HSt5YGEi8goV', icon: FaYoutube, label: 'YouTube' },
  { href: WA_URL, icon: FaWhatsapp, label: 'WhatsApp' },
  { href: 'https://play.google.com/store/apps/details?id=co.diy4.ptqkn&pcampaignid=web_share', icon: FaGooglePlay, label: 'Google Play' },
];

const QUICK_LINKS = [
  { name: 'About Us',          to: '/about' },
  { name: 'Results',           to: '/Selections' },
  { name: 'Book Demo Class',   to: '/book-demo' },
  { name: 'Exam Notifications',to: '/notifications' },
  { name: 'Current Affairs',   to: '/current-affairs' },
];

const Footer = () => {
  const [courses, setCourses] = useState([]);
  const [email,   setEmail]   = useState('');

  useEffect(() => {
    api.get('/courses')
      .then((res) => {
        const data = res.data.data || res.data;
        if (Array.isArray(data)) setCourses(data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
    // TODO: wire up newsletter API endpoint
  };

  const copyClassplusCode = () => {
    navigator.clipboard.writeText('Kaylhy').catch(() => {});
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        {/* ── Main grid ── */}
        <div className="container-custom py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5 w-fit">
              <div className="bg-white rounded-xl p-1.5 flex-shrink-0">
                <img src="/images/purelogo.png" alt="Samarth Academy" className="h-9 w-auto object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black text-white tracking-tight">SAMARTH</span>
                <span className="text-[10px] font-bold text-orange-400 tracking-[0.2em] uppercase">ACADEMY</span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Performance-driven government exam coaching in Amritsar.
              Founded and led by ex-government officers.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-1.5">ClassPlus App Code (iOS):</p>
              <button
                onClick={copyClassplusCode}
                className="text-orange-400 font-bold text-sm hover:text-orange-300 underline decoration-dotted underline-offset-2 transition-colors"
              >
                Kaylhy — tap to copy
              </button>
            </div>
          </div>

          {/* Col 2 — Courses (API-fetched) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Our Courses</h4>
            <ul className="space-y-2.5">
              {courses.length > 0
                ? courses.map((c) => (
                    <li key={c._id}>
                      <Link
                        to={`/courses/${c.slug}`}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors group"
                      >
                        <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        <span className="truncate">{c.title}</span>
                      </Link>
                    </li>
                  ))
                : <li className="text-sm text-gray-600">Loading courses…</li>
              }
              <li>
                <Link
                  to="/courses"
                  className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 transition-colors font-medium"
                >
                  <FaChevronRight className="text-[10px]" />View all courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors group"
                  >
                    <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Get in Touch</h4>
            <address className="not-italic space-y-4">
              <a href={PHONE_TEL} className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                <FaPhoneAlt className="text-red-500 mt-0.5 flex-shrink-0 group-hover:text-orange-400 transition-colors" />
                {PHONE}
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <FaWhatsapp className="text-green-500 mt-0.5 flex-shrink-0" />{WA_NUMBER}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                <FaEnvelope className="text-red-500 mt-0.5 flex-shrink-0 group-hover:text-orange-400 transition-colors" />
                <span className="break-all">{EMAIL}</span>
              </a>
              <p className="flex items-start gap-3 text-sm text-gray-400">
                <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />{ADDRESS}
              </p>
              <p className="flex items-start gap-3 text-sm text-gray-400">
                <FaClock className="text-red-500 mt-0.5 flex-shrink-0" />Mon–Sat, 9:00 AM – 7:00 PM
              </p>
            </address>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div className="border-t border-gray-800">
          <div className="container-custom py-7">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">Get exam updates & free study material</p>
                <p className="text-xs text-gray-500 mt-0.5">Join 5,000+ aspirants. Unsubscribe anytime.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    'flex-1 md:w-64 bg-gray-800 border border-gray-700 text-white placeholder-gray-500',
                    'text-sm px-4 py-2.5 rounded-btn',
                    'focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors',
                  )}
                />
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-btn transition-all duration-[250ms] flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-800">
          <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Samarth Academy. All rights reserved.</p>
            <p>Made with ♥ in Amritsar, Punjab</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
