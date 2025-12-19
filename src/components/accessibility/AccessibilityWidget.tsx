'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'x-large';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
}

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    contrast: 'normal',
    reducedMotion: false,
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply settings
    const html = document.documentElement;

    // Font size
    html.classList.remove('text-large', 'text-x-large');
    if (settings.fontSize !== 'normal') {
      html.classList.add(`text-${settings.fontSize}`);
    }

    // Contrast
    html.classList.toggle('high-contrast', settings.contrast === 'high');

    // Reduced motion
    html.classList.toggle('reduce-motion', settings.reducedMotion);

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-navy text-white p-3 rounded-full shadow-lg hover:bg-navy-dark transition-colors"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-72 border border-gray-200"
          >
            <h3 className="font-heading font-bold text-navy mb-4">
              Accessibility Options
            </h3>

            {/* Font Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Text Size
              </label>
              <div className="flex gap-2">
                {(['normal', 'large', 'x-large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSettings({ ...settings, fontSize: size })}
                    className={`px-3 py-1 rounded border transition-colors ${
                      settings.fontSize === size
                        ? 'bg-navy text-white border-navy'
                        : 'border-gray-300 hover:border-navy'
                    }`}
                  >
                    {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Contrast
              </label>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    contrast: settings.contrast === 'normal' ? 'high' : 'normal',
                  })
                }
                className={`w-full px-3 py-2 rounded border transition-colors ${
                  settings.contrast === 'high'
                    ? 'bg-navy text-white border-navy'
                    : 'border-gray-300 hover:border-navy'
                }`}
              >
                {settings.contrast === 'high' ? 'High Contrast On' : 'High Contrast Off'}
              </button>
            </div>

            {/* Reduced Motion */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) =>
                    setSettings({ ...settings, reducedMotion: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-charcoal">Reduce Motion</span>
              </label>
            </div>

            {/* Reset */}
            <button
              onClick={() =>
                setSettings({
                  fontSize: 'normal',
                  contrast: 'normal',
                  reducedMotion: false,
                })
              }
              className="mt-4 text-sm text-gold hover:text-gold-dark underline"
            >
              Reset to defaults
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
