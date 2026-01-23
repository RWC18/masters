import { colors } from "../../constants/styles";

export const SignInStyles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '.5s',
    paddingTop: '100px',
    width: '30%',
    height: '100%',
  },
  background:  {
    width: '70%',
    backgroundImage: `url(${process.env.PUBLIC_URL}/landing/banner.png)`,
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: (active: boolean) => ({
    cursor: 'pointer',
    color: active ? colors.ORANGE_ACTIVE : colors.TEXT_GRAY,
    borderBottom: active ? `2px solid ${colors.ORANGE_ACTIVE}` : '2px solid transparent',
    padding: `2px 12px`,
    fontSize: '16px',
    fontWeight: '500',
    transition: '.5s',
    '&:hover': {
      color: colors.ORANGE_LIGHT,
    },
}),
  form: (isActive: boolean) => ({
    transform: isActive ? 'scale(1)' : 'scale(1)',
    display: isActive ? 'block' : 'none',
    overflow: 'hidden',
    transition: '.5s',
  }),
};