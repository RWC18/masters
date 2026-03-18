import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/styles';

const languages = [
  { code: 'en', label: 'EN', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'hy', label: 'HY', flag: '\u{1F1E6}\u{1F1F2}' },
  { code: 'ru', label: 'RU', flag: '\u{1F1F7}\u{1F1FA}' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('vai_lang', code);
    setOpen(false);
  };

  return (
    <Box
      sx={{ position: 'relative', userSelect: 'none' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          padding: '6px 12px',
          borderRadius: '8px',
          transition: '.25s',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(13, 59, 102, 0.08)',
          },
        }}
      >
        <Typography sx={{ fontSize: '18px', lineHeight: 1 }}>
          {currentLang.flag}
        </Typography>
        <Typography
          sx={{
            color: colors.TEXT_GRAY,
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          {currentLang.label}
        </Typography>
      </Box>

      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: colors.BG_PAPER,
            borderRadius: '10px',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.12)'
                : '1px solid rgba(13, 59, 102, 0.18)',
            overflow: 'hidden',
            minWidth: '100px',
            zIndex: 100,
          }}
        >
          {languages.map((lang) => (
            <Box
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                cursor: 'pointer',
                transition: '.2s',
                backgroundColor:
                  lang.code === i18n.language
                    ? theme.palette.mode === 'dark'
                      ? 'rgba(238, 0, 90, 0.14)'
                      : 'rgba(13, 59, 102, 0.12)'
                    : 'transparent',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(13, 59, 102, 0.08)',
                },
              }}
            >
              <Typography sx={{ fontSize: '18px', lineHeight: 1 }}>
                {lang.flag}
              </Typography>
              <Typography
                sx={{
                  color:
                    lang.code === i18n.language
                      ? colors.ORANGE_ACTIVE
                      : colors.TEXT_GRAY,
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                {lang.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LanguageSelector;
