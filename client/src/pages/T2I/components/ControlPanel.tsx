import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { genStylesV2 } from '../../../constants/genStyles';
import Style from '../../../components/Style/Style';
import { T2IResultsStyles } from '../T2IResults.styles';
import { useT2IResultsConstants } from '../T2IResults.constants';

interface ControlPanelProps {
  prompt: string;
  selectedStyles: Array<{
    prompt: string;
    thumbnail: string;
    title: string;
  }>;
  onPromptChange: (value: string) => void;
  onStyleSelect: (style: {
    prompt: string;
    thumbnail: string;
    title: string;
  }) => void;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  selectedStyles,
  onPromptChange,
  onStyleSelect,
  onGenerate,
}) => {
  const T2I_RESULTS_CONSTANTS = useT2IResultsConstants();

  return (
    <Grid item xs={12} sm={12} lg={5} md={5}>
      <Typography sx={T2IResultsStyles.desktopTitle}>
        {T2I_RESULTS_CONSTANTS.title.main}
        <Typography component={'span'} sx={T2IResultsStyles.desktopTitleAccent}>
          {' '}
          {T2I_RESULTS_CONSTANTS.title.accent}{' '}
        </Typography>
        {T2I_RESULTS_CONSTANTS.title.end}
      </Typography>
      <Input
        placeholder={T2I_RESULTS_CONSTANTS.inputPlaceholder}
        value={prompt}
        handleChange={onPromptChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && prompt.trim().length > 0) onGenerate();
        }}
      />
      <Box sx={T2IResultsStyles.inputContainer}>
        <Button
          title={T2I_RESULTS_CONSTANTS.generateButton}
          handleClick={onGenerate}
          textColor={colors.TEXT_DARK}
          bgColor={colors.ORANGE_ACTIVE}
          padding={'14px 0px'}
          hoverColor={colors.ORANGE_LIGHT}
          isDisabled={prompt.trim().length <= 0}
        />
      </Box>
      <Grid
        container
        flexWrap={'wrap'}
        justifyContent={'flex-start'}
        alignItems={'top'}
        sx={T2IResultsStyles.stylesContainer}
        spacing={2}
      >
        {genStylesV2.map(
          (style: { prompt: string; title: string; thumbnail: string }) => (
            <Grid
              item
              sm={4}
              md={2}
              lg={2}
              xs={4}
              key={style.title}
              sx={{ paddingTop: '0px !important', marginBottom: '12px' }}
            >
              <Style
                title={style.title}
                thumbnail={style.thumbnail}
                isSelected={selectedStyles.includes(style)}
                onSelect={() => onStyleSelect(style)}
              />
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default ControlPanel;

