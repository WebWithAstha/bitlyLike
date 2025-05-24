// theme.js - MiniBitly Professional SaaS Design System

const COLORS = {
  // Primary Brand Colors - Deep Blue to Cyan Gradient System
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#1e40af',  // Main brand deep blue
    700: '#1d4ed8',
    800: '#1e3a8a',
    900: '#1e293b',
  },
  
  // Cyan Accent System
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',  // Main cyan accent
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  
  // Orange CTA & Success States
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Main CTA orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  
  // Professional Gray Palette with Warm Undertones
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',  // Dark mode primary
  },
  
  // Semantic Colors
  semantic: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  
  // Light Theme Colors
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceHover: '#f1f5f9',
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    overlay: 'rgba(15, 23, 42, 0.8)',
  },
  
  // Dark Theme Colors  
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    border: '#334155',
    borderHover: '#475569',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
};

const TYPOGRAPHY = {
  // Font Families
  fonts: {
    heading: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  },
  
  // Font Weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Font Sizes & Line Heights
  sizes: {
    xs: { size: '0.75rem', lineHeight: '1rem' },      // 12px
    sm: { size: '0.875rem', lineHeight: '1.25rem' },   // 14px
    base: { size: '1rem', lineHeight: '1.5rem' },      // 16px
    lg: { size: '1.125rem', lineHeight: '1.75rem' },   // 18px
    xl: { size: '1.25rem', lineHeight: '1.75rem' },    // 20px
    '2xl': { size: '1.5rem', lineHeight: '2rem' },     // 24px
    '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
    '4xl': { size: '2.25rem', lineHeight: '2.5rem' },  // 36px
    '5xl': { size: '3rem', lineHeight: '1' },          // 48px
    '6xl': { size: '3.75rem', lineHeight: '1' },       // 60px
  },
};

const SPACING = {
  // Base spacing scale (rem units)
  0: '0',
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
};

const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px - Main component radius
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

const SHADOWS = {
  // Subtle shadow system for professional SaaS feel
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // Brand gradient shadows
  primaryGlow: '0 0 20px rgb(30 64 175 / 0.3)',
  cyanGlow: '0 0 20px rgb(6 182 212 / 0.3)',
  orangeGlow: '0 0 20px rgb(249 115 22 / 0.3)',
};

const GRADIENTS = {
  // Brand gradients for premium SaaS feel
  primary: 'linear-gradient(135deg, #1e40af 0%, #06b6d4 100%)',
  primaryReverse: 'linear-gradient(135deg, #06b6d4 0%, #1e40af 100%)',
  
  // CTA gradients
  cta: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  ctaHover: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
  
  // Subtle background gradients
  surface: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  darkSurface: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  
  // Analytics dashboard gradients
  analytics: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
};

const ANIMATIONS = {
  // Transition durations
  duration: {
    fast: '150ms',
    default: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  // Easing functions
  easing: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Common transitions
  transitions: {
    all: 'all 200ms ease-in-out',
    colors: 'color 200ms ease-in-out, background-color 200ms ease-in-out, border-color 200ms ease-in-out',
    transform: 'transform 200ms ease-in-out',
    opacity: 'opacity 200ms ease-in-out',
  },
};

const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const Z_INDEX = {
  dropdown: 1000,
  sticky: 1010,
  fixed: 1020,
  modal: 1030,
  popover: 1040,
  tooltip: 1050,
  toast: 1060,
};

// Component-specific theme configurations
const COMPONENTS = {
  button: {
    height: {
      sm: '2rem',      // 32px
      md: '2.5rem',    // 40px
      lg: '3rem',      // 48px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.625rem 1rem',
      lg: '0.75rem 1.5rem',
    },
  },
  
  input: {
    height: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
    },
    padding: '0.625rem 0.75rem',
  },
  
  card: {
    padding: '1.5rem',
    radius: BORDER_RADIUS.lg,
    shadow: SHADOWS.md,
  },
  
  sidebar: {
    width: '16rem',      // 256px
    widthCollapsed: '4rem', // 64px
  },
};

// Theme modes
const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Main theme object
const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  gradients: GRADIENTS,
  animations: ANIMATIONS,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
  components: COMPONENTS,
  modes: THEME_MODES,
};

// Utility functions for theme usage
export const getColor = (path, theme = 'light') => {
  const pathArray = path.split('.');
  let result = COLORS;
  
  for (const key of pathArray) {
    result = result[key];
    if (!result) return null;
  }
  
  return result;
};

export const getSpacing = (size) => SPACING[size] || size;
export const getFontSize = (size) => TYPOGRAPHY.sizes[size] || TYPOGRAPHY.sizes.base;
export const getShadow = (size) => SHADOWS[size] || SHADOWS.default;
export const getGradient = (name) => GRADIENTS[name];

// CSS Custom Properties Generator for dynamic theming
export const generateCSSCustomProperties = (mode = 'light') => {
  const themeColors = mode === 'dark' ? COLORS.dark : COLORS.light;
  
  return {
    '--color-primary': COLORS.primary[600],
    '--color-primary-hover': COLORS.primary[700],
    '--color-cyan': COLORS.cyan[500],
    '--color-orange': COLORS.orange[500],
    '--color-background': themeColors.background,
    '--color-surface': themeColors.surface,
    '--color-text': themeColors.text,
    '--color-text-secondary': themeColors.textSecondary,
    '--color-border': themeColors.border,
    '--gradient-primary': GRADIENTS.primary,
    '--gradient-cta': GRADIENTS.cta,
    '--shadow-default': SHADOWS.default,
    '--shadow-lg': SHADOWS.lg,
    '--radius-default': BORDER_RADIUS.lg,
    '--transition-default': ANIMATIONS.transitions.all,
  };
};

// Export everything
export {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  GRADIENTS,
  ANIMATIONS,
  BREAKPOINTS,
  Z_INDEX,
  COMPONENTS,
  THEME_MODES,
};

export default THEME;