export interface FontOption {
  name: string;
  family: string;
  weights: string;
  category: 'sans-serif' | 'serif' | 'monospace';
  cssFamily: string;
}

const loadedFonts = new Set<string>();

export function loadGoogleFont(family: string): void {
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export const FONTS: FontOption[] = [
  { name: 'Inter', family: 'Inter', weights: '400;500;600;700', category: 'sans-serif', cssFamily: "'Inter', sans-serif" },
  { name: 'Roboto', family: 'Roboto', weights: '400;500;600;700', category: 'sans-serif', cssFamily: "'Roboto', sans-serif" },
  { name: 'Open Sans', family: 'Open Sans', weights: '400;500;600;700', category: 'sans-serif', cssFamily: "'Open Sans', sans-serif" },
  { name: 'Lato', family: 'Lato', weights: '400;500;600;700', category: 'sans-serif', cssFamily: "'Lato', sans-serif" },
  { name: 'Nunito', family: 'Nunito', weights: '400;500;600;700', category: 'sans-serif', cssFamily: "'Nunito', sans-serif" },
  { name: 'Work Sans', family: 'Work Sans', weights: '400;500;600;700', category: 'sans-serif', cssFamily: "'Work Sans', sans-serif" },
  { name: 'Merriweather', family: 'Merriweather', weights: '400;500;600;700', category: 'serif', cssFamily: "'Merriweather', serif" },
  { name: 'Playfair Display', family: 'Playfair Display', weights: '400;500;600;700', category: 'serif', cssFamily: "'Playfair Display', serif" },
  { name: 'Lora', family: 'Lora', weights: '400;500;600;700', category: 'serif', cssFamily: "'Lora', serif" },
  { name: 'Fira Code', family: 'Fira Code', weights: '400;500;600;700', category: 'monospace', cssFamily: "'Fira Code', monospace" },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', weights: '400;500;600;700', category: 'monospace', cssFamily: "'JetBrains Mono', monospace" },
  { name: 'Source Code Pro', family: 'Source Code Pro', weights: '400;500;600;700', category: 'monospace', cssFamily: "'Source Code Pro', monospace" },
];
