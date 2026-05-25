import { Box } from '@mui/material';
import React from 'react';
import { usePluses } from '../../../constants/pluses';
import { HomeStyles } from '../Home.styles';
import { useHomeConstants } from '../Home.constants';
import PlusCard from './PlusCard';
import SectionHeader from './SectionHeader';

const AboutSection = () => {
  const HOME = useHomeConstants();
  const pluses = usePluses();

  return (
    <Box component="section" sx={HomeStyles.section}>
      <SectionHeader
        id="about"
        eyebrow={HOME.about.eyebrow}
        title={HOME.about.title}
        description={HOME.about.description}
        centered
      />
      <Box sx={HomeStyles.plusGrid}>
        {pluses.map((plus, id) => (
          <PlusCard
            key={id}
            title={plus.title}
            description={plus.description}
            icon={plus.icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AboutSection;
