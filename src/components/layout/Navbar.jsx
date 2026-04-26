import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaPhoneAlt, FaEnvelope, FaClock, FaBars, FaTimes, FaChevronDown, FaWhatsapp,
  FaFacebookF, FaInstagram, FaYoutube, FaGooglePlay,
  FaGraduationCap, FaUniversity, FaShieldAlt, FaFileAlt,
  FaBookOpen, FaChartLine, FaMoneyBillWave,
} from 'react-icons/fa';
import { cn } from '../../lib/utils';

const PHONE      = '+91 99889 49969';
const PHONE_TEL  = 'tel:+919988949969';
const WHATSAPP   = 'https://wa.me/919041973105?text=Hi%2C%20I%27m%20interested%20in%20Samarth%20Academy%20coaching.%20Please%20share%20details.';
const EMAIL      = 'samarth.academy2006@gmail.com';

const NAV_LINKS = [
  { name: 'Home',           path: '/' },
  { name: 'Notifications',  path: '/notifications' },
  { name: 'Current Affairs',path: '/current-affairs' },
  { name: 'Results',        path: '/Selections' },
  { name: 'About',          path: '/about' },
];

const COURSE_ITEMS = [
  { icon: FaGraduationCap,  title: 'SSC Coaching',  desc: 'SSC CGL, CHSL & MTS prep',       href: '/courses/ssc-coaching' },
  { icon: FaUniversity,     title: 'Banking',        desc: 'IBPS, SBI PO & Clerk coaching',  href: '/courses/banking' },
  { icon: FaShieldAlt,      title: 'Punjab Police',  desc: 'Constable & SI preparation',     href: '/courses/punjab-police' },
  { icon: FaFileAlt,        title: 'SSC CGL',        desc: 'Combined Graduate Level exam',   href: '/courses/ssc-cgl' },
  { icon: FaMoneyBillWave,  title: 'IBPS PO',        desc: 'Probationary Officer coaching',  href: '/courses/ibps-po' },
  { icon: FaBookOpen,       title: 'UGC NET',        desc: 'National Eligibility Test prep', href: '/courses/ugc-net' },
  { icon: FaChartLine,      title: 'CAT',            desc: 'Common Admission Test prep',     href: '/courses/cat' },
];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close drawer on navigation
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ── Top info strip (desktop only) ── */}
      <div className="hidden md:block bg-red-500 text-white text-xs">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-5">
            <a href={PHONE_TEL} className="flex items-center gap-1.5 hover:text-orange-200 transition-colors">
              <FaPhoneAlt className="text-orange-300" />{PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-orange-200 transition-colors">
              <FaEnvelope className="text-orange-300" />{EMAIL}
            </a>
            <span className="flex items-center gap-1.5 text-red-200">
              <FaClock className="text-orange-300" />Mon–Sat, 9:00 AM – 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/samarthacademy2006" target="_blank" rel="noopener noreferrer" aria-label="Facebook"  className="hover:text-orange-300 transition-colors"><FaFacebookF /></a>
            <a href="https://www.instagram.com/gyanm.samarth.academy?igsh=MTB0NnI5dTliNDlicA%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-300 transition-colors"><FaInstagram /></a>
            <a href="https://youtube.com/@samarth.academyy?si=N6X6HSt5YGEi8goV" target="_blank" rel="noopener noreferrer" aria-label="YouTube"   className="hover:text-orange-300 transition-colors"><FaYoutube /></a>
            <a href={WHATSAPP}      target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"  className="hover:text-orange-300 transition-colors"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* ── Main sticky navigation ── */}
      <nav className={cn(
        'sticky top-0 z-40 bg-white transition-all duration-200',
        scrolled ? 'shadow-card' : 'border-b border-gray-100',
      )}>
        <div className={cn(
          'container-custom flex items-center justify-between transition-all duration-200',
          scrolled ? 'h-16' : 'h-20',
        )}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/images/purelogo.png"
              alt="Samarth Academy"
              className="object-contain transition-all duration-200 group-hover:scale-105 rounded-md"
              style={{ height: scrolled ? '42px' : '52px', width: 'auto' }}
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-gray-900 tracking-tight">SAMARTH</span>
              <span className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase">ACADEMY</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative pb-0.5 transition-colors duration-150 hover:text-red-500',
                  'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-red-500 after:transition-transform after:duration-150 after:origin-left',
                  isActive(link.path) ? 'text-red-500 after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Courses with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button className={cn(
                'flex items-center gap-1 relative pb-0.5 transition-colors duration-150 hover:text-red-500',
                'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-red-500 after:transition-transform after:duration-150 after:origin-left',
                isActive('/courses') ? 'text-red-500 after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
              )}>
                Courses
                <FaChevronDown className={cn('text-[10px] transition-transform duration-150', coursesOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {coursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-120"
                  >
                    <div className="bg-white rounded-card shadow-lifted border border-gray-100 p-4 grid grid-cols-2 gap-1">
                      <div className="col-span-2 flex items-center justify-between pb-2 mb-1 border-b border-gray-100">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">All Courses</span>
                        <Link to="/courses" className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">
                          View all →
                        </Link>
                      </div>
                      {COURSE_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 transition-colors group/item"
                        >
                          <span className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0 group-hover/item:bg-red-100 transition-colors">
                            <item.icon className="text-sm" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={PHONE_TEL} className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors">
              <FaPhoneAlt className="text-red-500 text-xs" />{PHONE}
            </a>
            <Link
              to="/book-demo"
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-btn transition-all duration-base hover:shadow-primary-glow"
            >
              Book Free Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-red-500 transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-red-500"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lifted flex flex-col lg:hidden"
              aria-label="Navigation drawer"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img src="/images/purelogo.png" alt="Samarth Academy" className="h-9 w-auto object-contain rounded" />
                  <span className="font-black text-gray-900 tracking-tight">SAMARTH</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg"
                  aria-label="Close navigation menu"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Scrollable links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/courses"
                      className={cn(
                        'flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                        isActive('/courses') ? 'bg-red-50 text-red-500' : 'text-gray-700 hover:bg-gray-50',
                      )}
                    >
                      Courses
                    </Link>
                  </li>
                  {NAV_LINKS.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                          isActive(link.path) ? 'bg-red-50 text-red-500' : 'text-gray-700 hover:bg-gray-50',
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Quick contact in drawer */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <a
                    href={PHONE_TEL}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm"
                  >
                    <FaPhoneAlt className="shrink-0" />{PHONE}
                  </a>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold text-sm"
                  >
                    <FaWhatsapp className="shrink-0" />Chat on WhatsApp
                  </a>
                </div>
              </nav>

              {/* Book Demo CTA */}
              <div className="px-6 py-5 border-t border-gray-100">
                <Link
                  to="/book-demo"
                  className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-btn transition-all duration-200 text-sm tracking-wide"
                >
                  Book Free Demo Class
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
