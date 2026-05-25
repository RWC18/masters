'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { LanguageSelectorStyles } from './LanguageSelector.styles';

const CLOSE_DELAY_MS = 180;

const languages = [
  { code: 'en', label: 'EN', flag: '\u{1F1EC}\u{1F1E7}', nameKey: 'language.english' },
  { code: 'hy', label: 'HY', flag: '\u{1F1E6}\u{1F1F2}', nameKey: 'language.armenian' },
  { code: 'ru', label: 'RU', flag: '\u{1F1F7}\u{1F1FA}', nameKey: 'language.russian' },
];

interface LanguageSelectorProps {
  variant?: 'default' | 'drawer';
}

const LanguageSelector = ({ variant = 'default' }: LanguageSelectorProps) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolvedCode = i18n.language?.split('-')[0] || 'en';
  const currentLang =
    languages.find((l) => l.code === resolvedCode) || languages[0];

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  const handleOpen = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('vai_lang', code);
    clearCloseTimer();
    setOpen(false);
  };

  useEffect(() => {
    if (variant === 'drawer') return;

    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        clearCloseTimer();
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearCloseTimer();
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', onDocClick);
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, variant]);

  useEffect(() => () => clearCloseTimer(), []);

  if (variant === 'drawer') {
    return (
      <Box sx={LanguageSelectorStyles.drawerList}>
        {languages.map((lang) => {
          const active = lang.code === resolvedCode;
          return (
            <Box
              key={lang.code}
              sx={LanguageSelectorStyles.drawerItem(active)}
              onClick={() => handleChange(lang.code)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleChange(lang.code)}
            >
              <Typography sx={LanguageSelectorStyles.menuFlag}>
                {lang.flag}
              </Typography>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={LanguageSelectorStyles.menuText(active)}>
                  {t(lang.nameKey)}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600 }}
                >
                  {lang.label}
                </Typography>
              </Box>
              {active && <CheckIcon sx={LanguageSelectorStyles.check} />}
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Box
      ref={rootRef}
      sx={LanguageSelectorStyles.root}
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <Box
        sx={LanguageSelectorStyles.trigger(open)}
        onClick={() => {
          clearCloseTimer();
          setOpen((v) => !v);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clearCloseTimer();
            setOpen((v) => !v);
          }
        }}
      >
        <Typography sx={LanguageSelectorStyles.triggerFlag}>
          {currentLang.flag}
        </Typography>
        <Typography sx={LanguageSelectorStyles.triggerLabel}>
          {currentLang.label}
        </Typography>
        <KeyboardArrowDownIcon sx={LanguageSelectorStyles.chevron(open)} />
      </Box>

      {open && (
        <Box
          sx={LanguageSelectorStyles.menuWrap}
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          <Box sx={LanguageSelectorStyles.menu} role="listbox">
            {languages.map((lang) => {
              const active = lang.code === resolvedCode;
              return (
                <Box
                  key={lang.code}
                  sx={LanguageSelectorStyles.menuItem(active)}
                  onClick={() => handleChange(lang.code)}
                  role="option"
                  aria-selected={active}
                >
                  <Typography sx={LanguageSelectorStyles.menuFlag}>
                    {lang.flag}
                  </Typography>
                  <Typography sx={LanguageSelectorStyles.menuText(active)}>
                    {t(lang.nameKey)}
                  </Typography>
                  {active && <CheckIcon sx={LanguageSelectorStyles.check} />}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LanguageSelector;
