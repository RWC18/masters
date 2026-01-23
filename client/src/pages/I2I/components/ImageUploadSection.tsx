import { Box, Grid, IconButton } from '@mui/material';
import React from 'react';
import { PhotoCamera } from '@mui/icons-material';
import { colors } from '../../../constants/styles';
import { I2IStyles } from '../I2I.styles';

interface ImageUploadSectionProps {
  imageUrl: string | null;
  onImageChange: (file: File) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  imageUrl,
  onImageChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Grid item xs={3} sm={3} md={1} lg={1}>
      <input
        accept='image/*'
        id='image-upload'
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor='image-upload'>
        {imageUrl ? (
          <Box
            sx={{
              ...I2IStyles.imagePreview,
              background: `url(${imageUrl}) center center / contain`,
            }}
          />
        ) : (
          <IconButton component='span' sx={I2IStyles.imageUploadButton}>
            <PhotoCamera htmlColor={colors.TEXT_GRAY} />
          </IconButton>
        )}
      </label>
    </Grid>
  );
};

export default ImageUploadSection;

