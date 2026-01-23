import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { colors } from '../../../constants/styles';
import { genStylesV2 } from '../../../constants/genStyles';
import Style from '../../../components/Style/Style';
import { I2IResultsStyles } from '../I2IResults.styles';
import { I2I_RESULTS_CONSTANTS } from '../I2IResults.constants';

interface ControlPanelProps {
  prompt: string;
  imageUrl: string | null;
  selectedStyles: Array<{
    prompt: string;
    thumbnail: string;
    title: string;
  }>;
  onPromptChange: (value: string) => void;
  onImageChange: (file: File) => void;
  onStyleSelect: (style: {
    prompt: string;
    thumbnail: string;
    title: string;
  }) => void;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  imageUrl,
  selectedStyles,
  onPromptChange,
  onImageChange,
  onStyleSelect,
  onGenerate,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Grid item xs={12} sm={12} lg={5} md={5}>
      <Typography sx={I2IResultsStyles.desktopTitle}>
        {I2I_RESULTS_CONSTANTS.title.main}
        <Typography component={'span'} sx={I2IResultsStyles.desktopTitleAccent}>
          {' '}
          {I2I_RESULTS_CONSTANTS.title.accent}{' '}
        </Typography>
        {I2I_RESULTS_CONSTANTS.title.end}
      </Typography>
      <Input
        placeholder={I2I_RESULTS_CONSTANTS.inputPlaceholder}
        value={prompt}
        handleChange={onPromptChange}
      />
      <Box sx={I2IResultsStyles.inputContainer}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Grid item lg={2} md={2} sm={3} xs={3}>
            <input
              accept='image/*'
              id='image-upload'
              type='file'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor='image-upload'>
              <Box
                sx={{
                  ...I2IResultsStyles.imagePreview,
                  background: imageUrl
                    ? `url(${imageUrl}) center center / contain`
                    : 'none',
                }}
              />
            </label>
          </Grid>
          <Grid item lg={10} md={10} sm={9} xs={9}>
            <Button
              title={I2I_RESULTS_CONSTANTS.generateButton}
              handleClick={onGenerate}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              padding='14px 0px'
              hoverColor={colors.ORANGE_LIGHT}
              isDisabled={prompt.trim().length <= 0}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        flexWrap={'wrap'}
        justifyContent={'flex-start'}
        alignItems={'top'}
        sx={I2IResultsStyles.stylesContainer}
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

