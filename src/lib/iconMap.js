import {
  FaGraduationCap, FaUniversity, FaShieldAlt, FaFileAlt,
  FaMoneyBillWave, FaBookOpen, FaChartLine, FaUserTie,
  FaLaptop, FaCertificate, FaBullseye, FaAward,
  FaClipboardList, FaBalanceScale, FaCalculator, FaGlobe,
} from 'react-icons/fa';

// Maps the `icon` string stored in the DB to the actual React component.
// Use getIcon(name) in components instead of ICON_MAP[name] directly.
export const getIcon = (name) => (name ? ICON_MAP[name] || null : null);

export const ICON_MAP = {
  FaGraduationCap,
  FaUniversity,
  FaShieldAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaBookOpen,
  FaChartLine,
  FaUserTie,
  FaLaptop,
  FaCertificate,
  FaBullseye,
  FaAward,
  FaClipboardList,
  FaBalanceScale,
  FaCalculator,
  FaGlobe,
};
