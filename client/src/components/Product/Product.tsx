import React from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '../Button/Button';
import { colors } from '../../constants/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPopUpStatus, setPopUpContent } from '../../redux/Actions/mainActions';
import Login from '../SignIn/SignIn';

interface Props {
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  reverse: boolean;
}

const Product = ({ title, url, thumbnail, description, reverse }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.main.user);

  const handleGenerateClick = () => {
    if (user) {
      navigate(url);
    } else {
      dispatch<any>(setPopUpStatus(true));
      dispatch<any>(setPopUpContent(<Login />));
    }
  };

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      spacing={{ md: 3, xs: 0 }}
      sx={{
        width: '100%',
        margin: { md: '10px 0px', xs: '32px 0px' },
        flexWrap: { md: 'no-wrap', xs: 'wrap' },
        flexDirection: {
          md: reverse ? 'row-reverse' : 'row',
          xs: 'column-reverse',
        },
      }}
      columns={{ xs: 6, sm: 6, md: 6, lg: 6 }}
    >
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Grid
          container
          justifyContent={{ md: 'flex-start', xs: 'center' }}
          alignItems={{ md: 'flex-start', xs: 'center' }}
          spacing={{ md: 5, xs: 1 }}
          flexDirection={'column'}
        >
          <Grid item>
            <Typography
              sx={{
                color: colors.ORANGE_LIGHT,
                fontSize: { md: '48px', xs: '22px' },
                fontWeight: '800',
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: colors.TEXT_GRAY,
                fontSize: { md: '24px', xs: '16px' },
                fontWeight: '300',
                textAlign: { md: 'left', xs: 'center' },
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              isDisabled={false}
              title='Generate'
              handleClick={handleGenerateClick}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              hoverColor={colors.ORANGE_LIGHT}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={2} md={2} lg={2}>
        <img src={`/products-v2/${thumbnail}`} width={'100%'} alt={title} />
      </Grid>
    </Grid>
  );
};

export default Product;
