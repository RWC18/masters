import { ToolPageStyles } from '../shared/ToolPage.styles';

export const T2IResultsStyles = {
  container: ToolPageStyles.resultsPage,
  ...ToolPageStyles,
  mobileTitle: ToolPageStyles.mobileTitle,
  desktopTitle: ToolPageStyles.sidebarTitle,
  desktopTitleAccent: ToolPageStyles.sidebarTitleAccent,
  title: ToolPageStyles.sidebarTitle,
  titleAccent: ToolPageStyles.sidebarTitleAccent,
  inputContainer: { mt: 2 },
  stylesContainer: {
    maxHeight: { md: 480, xs: 'none' },
    overflowY: 'auto',
    mt: 2,
    pr: 0.5,
  },
  imageCard: ToolPageStyles.imageCard,
  actionButtons: ToolPageStyles.imageActions,
  actionButton: { cursor: 'pointer' },
  actionIconContainer: ToolPageStyles.actionIconBtn,
};
