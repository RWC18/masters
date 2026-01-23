import { Grid } from '@mui/material';
import React from 'react';
import { industriesData } from '../../../constants/genIndustries';
import Industry from '../Industry';
import { LogoGenStyles } from '../LogoGen.styles';

interface IndustriesSectionProps {
  selectedIndustry: string;
  onIndustrySelect: (industryId: string) => void;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  selectedIndustry,
  onIndustrySelect,
}) => {
  return (
    <Grid
      container
      sx={LogoGenStyles.industriesGrid}
      spacing={{ md: 4, xs: 1 }}
      columns={{ md: 9, xs: 3 }}
    >
      {industriesData.map(
        (industry: { title: string; id: string; icon: JSX.Element }) => (
          <Grid item sm={1} md={1} lg={1} xs={1} key={industry.id}>
            <Industry
              industry={industry}
              isActive={selectedIndustry === industry.id}
              onSelect={() => onIndustrySelect(industry.id)}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default IndustriesSection;

