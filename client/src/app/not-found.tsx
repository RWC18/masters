import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        sx={{ fontSize: { xs: 64, md: 96 }, fontWeight: 800, lineHeight: 1 }}
      >
        404
      </Typography>
      <Typography sx={{ fontSize: { xs: 20, md: 28 }, fontWeight: 600 }}>
        Page not found
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        The page you are looking for doesn&apos;t exist.
      </Typography>
      <Link
        href="/"
        style={{
          marginTop: '16px',
          color: '#EE005A',
          fontWeight: 600,
          textDecoration: 'underline',
        }}
      >
        Go back home
      </Link>
    </Box>
  );
}
