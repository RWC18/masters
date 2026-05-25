import { ToolPageStyles } from '../shared/ToolPage.styles';

export const LogoGenResultsStyles = {
  container: ToolPageStyles.resultsPage,
  ...ToolPageStyles,
  title: { ...ToolPageStyles.title, textAlign: 'center', mb: 3 },
  titleAccent: ToolPageStyles.titleAccent,
  resultsGrid: ToolPageStyles.resultsGridWide,
  imageCard: ToolPageStyles.imageCard,
  actionButtons: ToolPageStyles.imageActions,
  actionButton: { cursor: 'pointer' },
  actionIconContainer: ToolPageStyles.actionIconBtn,
  buttonsContainer: { mt: 3, maxWidth: 900, mx: 'auto', width: '100%' },
  buttonsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1.5,
    justifyContent: { xs: 'center', md: 'flex-end' },
  },
};
