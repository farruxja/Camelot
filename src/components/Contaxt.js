
import React from 'react';

export const COLORS = {
  primary: '#2D3494',
  secondary: '#4351DB',
  accent: '#EEF2FF',
  text: '#1E293B',
};

export const TEACHERS = [
  'Hohlagan ustoz',
  'Mr. Alexander - IELTS 8.5',
  'Ms. Sarah - General English',
  'Mr. Javohir - Advanced Grammar',
  'Ms. Elena - Speaking Specialist'
];

export const TIMES = [
  'Hohlagan vaqt',
  '09:00 - 11:00',
  '11:00 - 13:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
  '18:00 - 20:00'
];

export const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-gradient-to-br from-[#2D3494] to-[#4351DB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 15V9a5 5 0 0 1 5-5h6" />
        <path d="M15 20h-6a5 5 0 0 1-5-5" />
        <path d="M11 9h9" />
        <path d="M11 15h9" />
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-extrabold tracking-tight text-[#2D3494]">CAMELOT</span>
      <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">IELTS CENTER</span>
    </div>
  </div>
);
