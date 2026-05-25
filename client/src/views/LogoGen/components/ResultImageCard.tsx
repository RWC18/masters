import React from 'react';
import ToolResultCard from '../../shared/ToolResultCard';

interface ResultImageCardProps {
  imageUrl: string;
  onZoom: (url: string) => void;
}

const ResultImageCard: React.FC<ResultImageCardProps> = ({
  imageUrl,
  onZoom,
}) => <ToolResultCard imageUrl={imageUrl} onZoom={onZoom} />;

export default ResultImageCard;
