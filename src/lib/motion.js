/**
 * Shared Framer Motion variants for Samarth Academy.
 *
 * Install: npm install framer-motion
 *
 * Two usage patterns:
 *
 * 1. Direct spread (simple elements):
 *    <motion.div {...fadeInUp}>Content</motion.div>
 *
 *    Scroll-triggered version:
 *    <motion.div
 *      initial={fadeInUp.initial}
 *      whileInView={fadeInUp.animate}
 *      transition={fadeInUp.transition}
 *      viewport={viewportConfig}
 *    >
 *
 * 2. Named variants (stagger containers):
 *    <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={viewportConfig}>
 *      <motion.div variants={staggerItem}>Item</motion.div>
 *    </motion.div>
 */

const smooth = [0.22, 1, 0.36, 1];

// ─── Direct-spread variants ───────────────────────────────────────────

export const fadeInUp = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: smooth },
};

export const fadeIn = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.4, ease: smooth },
};

export const slideInLeft = {
  initial:    { opacity: 0, x: -32 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: smooth },
};

export const slideInRight = {
  initial:    { opacity: 0, x: 32 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: smooth },
};

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.94 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: smooth },
};

// ─── Named variants (stagger orchestration) ───────────────────────────

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.05,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smooth },
  },
};

// ─── Viewport config ──────────────────────────────────────────────────

export const viewportConfig = { once: true, margin: '-80px' };
