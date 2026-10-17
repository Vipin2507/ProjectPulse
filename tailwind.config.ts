import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F5F7FB',
        line: '#E6EAF2',
        track: '#EEF2F6',
        ink: {
          DEFAULT: '#111827',
          secondary: '#374151',
          muted: '#6B7280',
        },
        brand: {
          DEFAULT: '#2563EB',
          soft: '#EAF1FF',
        },
        success: {
          DEFAULT: '#16A34A',
          soft: '#E8F7EE',
        },
        warning: {
          DEFAULT: '#F59E0B',
          soft: '#FFF4E5',
        },
        danger: {
          DEFAULT: '#DC2626',
          soft: '#FDECEC',
        },
        purple: '#8B5CF6',
        kpi: {
          sales: '#EEF4FF',
          received: '#E8F7EE',
          outstanding: '#FFF7EB',
          overdue: '#FDECEC',
          due: '#F3F7FF',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
