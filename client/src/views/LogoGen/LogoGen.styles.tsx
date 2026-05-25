import { ToolPageStyles } from '../shared/ToolPage.styles';

export const LogoGenStyles = {
  container: ToolPageStyles.page,
  ...ToolPageStyles,
  inputContainer: ToolPageStyles.panelSection,
  inputGrid: ToolPageStyles.inputRow,
  selectionContainer: ToolPageStyles.stylesSection,
  colorsSectionTitle: ToolPageStyles.stylesSectionTitle,
  colorsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: { xs: 1.25, md: 1.75 },
    maxWidth: 800,
    mx: 'auto',
  },
  colorItem: {
    flex: '0 0 auto',
    width: 110,
  },
  generateButtonContainer: {
    display: { md: 'flex', xs: 'none' },
    justifyContent: 'center',
    mt: 2,
  },
};
