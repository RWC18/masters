import { ToolPageStyles } from '../shared/ToolPage.styles';
import { AvatarStyles } from './Avatar.styles';

export const AvatarResultsStyles = {
  container: ToolPageStyles.resultsPage,
  ...ToolPageStyles,
  mobileTitle: ToolPageStyles.mobileTitle,
  desktopTitle: ToolPageStyles.sidebarTitle,
  desktopTitleAccent: ToolPageStyles.sidebarTitleAccent,
  title: ToolPageStyles.sidebarTitle,
  titleAccent: ToolPageStyles.sidebarTitleAccent,
  inputContainer: { mt: 2 },
  imagePreview: AvatarStyles.imagePreview,
  imageCard: ToolPageStyles.imageCard,
  actionButtons: ToolPageStyles.imageActions,
  actionButton: { cursor: 'pointer' },
  actionIconContainer: ToolPageStyles.actionIconBtn,
  stylesTabsContainer: AvatarStyles.tabsContainer,
  stylesContainer: { mt: 1.5 },
  stylesGrid: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  tab: AvatarStyles.tab,
  tabActive: AvatarStyles.tabActive,
  emojiCircle: AvatarStyles.emojiCircle,
};
