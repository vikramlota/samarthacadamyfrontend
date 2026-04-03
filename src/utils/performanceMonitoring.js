/**
 * Performance Monitoring Utility
 * Tracks and reports performance metrics for React applications
 */

/**
 * Web Vitals Tracker
 * Monitors Core Web Vitals: LCP, FID, CLS
 */
export const initWebVitalsTracking = () => {
  if (!window.addEventListener) return;

  // Largest Contentful Paint (LCP) - Loading performance
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('📊 LCP (Largest Contentful Paint):', lastEntry.renderTime || lastEntry.loadTime, 'ms');
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP not supported in this browser');
  }

  // First Input Delay (FID) - Interactivity
  if ('PerformanceObserver' in window) {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('⚡ FID (First Input Delay):', entry.processingDuration, 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID not supported in this browser');
    }
  }

  // Cumulative Layout Shift (CLS) - Visual stability
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('🎞️ CLS (Cumulative Layout Shift):', clsValue.toFixed(3));
      }
    });
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS not supported in this browser');
  }
};

/**
 * Performance Navigation Timing
 */
export const logNavigationTiming = () => {
  if (performance && performance.timing) {
    const timing = performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const connectTime = timing.responseEnd - timing.requestStart;
    const renderTime = timing.domComplete - timing.domLoading;

    console.group('📈 Navigation Timing');
    console.log('Page Load Time:', pageLoadTime, 'ms');
    console.log('Connect Time:', connectTime, 'ms');
    console.log('Render Time:', renderTime, 'ms');
    console.log('DOM Content Loaded:', timing.domContentLoadedEventEnd - timing.navigationStart, 'ms');
    console.groupEnd();
  }
};

/**
 * Resource Timing Logger
 * Logs timing for all loaded resources
 */
export const logResourceTiming = () => {
  if (performance && performance.getEntriesByType) {
    const resources = performance.getEntriesByType('resource');
    const totalTime = resources.reduce((acc, res) => acc + res.duration, 0);

    console.group('📦 Resource Timing');
    resources.forEach((resource) => {
      console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
    });
    console.log('Total Resource Load Time:', totalTime.toFixed(2), 'ms');
    console.groupEnd();
  }
};

/**
 * Paint Timing Logger
 * Logs First Paint and First Contentful Paint
 */
export const logPaintTiming = () => {
  if (performance && performance.getEntriesByType) {
    const paintEntries = performance.getEntriesByType('paint');
    console.group('🎨 Paint Timing');
    paintEntries.forEach((entry) => {
      console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
    });
    console.groupEnd();
  }
};

/**
 * Memory Usage Tracker (Chrome only)
 */
export const logMemoryUsage = () => {
  if (performance && performance.memory) {
    const memory = performance.memory;
    console.group('💾 Memory Usage');
    console.log('Heap Limit:', (memory.jsHeapSizeLimit / 1048576).toFixed(2), 'MB');
    console.log('Heap Used:', (memory.usedJSHeapSize / 1048576).toFixed(2), 'MB');
    console.log('Heap Total:', (memory.totalJSHeapSize / 1048576).toFixed(2), 'MB');
    console.groupEnd();
  }
};

/**
 * React Component Render Time Tracker
 * Usage: Place inside useEffect to measure component render time
 */
export const measureComponentRender = (componentName) => {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`⏱️ ${componentName} rendered in ${renderTime.toFixed(2)}ms`);
  };
};

/**
 * Performance Report Generator
 * Runs all performance checks and generates a comprehensive report
 */
export const generatePerformanceReport = () => {
  console.clear();
  console.log('%c🚀 PERFORMANCE REPORT', 'font-size: 20px; font-weight: bold; color: #00FF00');
  console.log('Timestamp:', new Date().toISOString());
  console.log('---');

  logNavigationTiming();
  logPaintTiming();
  logResourceTiming();
  logMemoryUsage();

  console.log('%c✅ Report Complete', 'font-size: 14px; font-weight: bold; color: #00FF00');
};

/**
 * Performance Threshold Checker
 * Logs warnings if performance metrics exceed thresholds
 */
export const checkPerformanceThresholds = (thresholds = {}) => {
  const defaults = {
    pageLoadTime: 3000,
    LCP: 2500,
    FID: 100,
    CLS: 0.1
  };

  const config = { ...defaults, ...thresholds };

  const checkNavigation = () => {
    if (performance && performance.timing) {
      const timing = performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;

      if (pageLoadTime > config.pageLoadTime) {
        console.warn(
          `⚠️ Page Load Time (${pageLoadTime}ms) exceeds threshold (${config.pageLoadTime}ms)`
        );
      }
    }
  };

  checkNavigation();

  // Monitor LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcpValue = lastEntry.renderTime || lastEntry.loadTime;

      if (lcpValue > config.LCP) {
        console.warn(
          `⚠️ LCP (${lcpValue}ms) exceeds threshold (${config.LCP}ms)`
        );
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // LCP not supported
  }
};

/**
 * Page Visibility Tracker
 * Logs when user switches tabs or minimizes the window
 */
export const initVisibilityTracking = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('📉 User switched away from page');
    } else {
      console.log('📈 User returned to page');
    }
  });
};

export default {
  initWebVitalsTracking,
  logNavigationTiming,
  logResourceTiming,
  logPaintTiming,
  logMemoryUsage,
  measureComponentRender,
  generatePerformanceReport,
  checkPerformanceThresholds,
  initVisibilityTracking
};
