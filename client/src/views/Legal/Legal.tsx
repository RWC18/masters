import { Box, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';
import { legalProps } from '../../constants/legalProps';
import LegalSections from '../../components/Legal/LegalSections';

const Legal = () => {
  return (
    <Box
      sx={{
        padding: '12px 64px',
      }}
    >
      <Typography
        sx={{
          color: colors.TEXT_WHITE,
          fontSize: '58px',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        Legal Information
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '400',
          textAlign: 'center',
          color: colors.TEXT_GRAY,
        }}
      >
        Thank you for choosing VAi, your innovative platform for AI-generated
        content creation. Before you explore and utilize our services, please
        take a moment to review the legal information outlined below. Your use
        of our website and services implies your acceptance of these terms and
        conditions.
      </Typography>
      {legalProps.map((legal: { title: string; description: string }, id) => (
        <LegalSections
          description={legal.description}
          title={`${id + 1}. ${legal.title}`}
          key={id}
        />
      ))}
      <Box sx={{ margin: '32px 0px' }}>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '300',
            textAlign: 'center',
            color: colors.TEXT_GRAY,
          }}
        >
          If you have any questions or concerns regarding the legal information
          on this page, please contact us at legal-support@vai.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Legal;
