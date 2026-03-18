import React from 'react';
import { Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../context/ThemeContext';
import { colors } from '../../constants/styles';

export const ThemeSwitch: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box
      onClick={toggleMode}
      sx={{
        width: 44,
        height: 24,
        borderRadius: 12,
        bgcolor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        transition: 'all .3s',
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)',
        },
      }}
    >
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: colors.ORANGE_ACTIVE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isDark ? 'translateX(0)' : 'translateX(20px)',
          transition: 'transform .3s',
          color: colors.ON_PRIMARY,
        }}
      >
        {isDark ? (
          <DarkModeIcon sx={{ fontSize: 12 }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 12 }} />
        )}
      </Box>
    </Box>
  );
};

export default ThemeSwitch;
