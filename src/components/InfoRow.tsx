
import React from 'react';
import InfoTooltip from './InfoTooltip';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  tooltip: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, tooltip }) => {
  return (
    <div className="info-row flex flex-col sm:flex-row sm:items-center py-2.5 border-b border-border/30 last:border-0">
      <div className="info-label flex items-center text-sm font-medium text-muted-foreground mb-1 sm:mb-0 sm:w-1/3">
        {label} <InfoTooltip content={tooltip} />
      </div>
      <div className="info-value text-sm text-foreground font-mono break-all sm:w-2/3">
        {value || 'Not available'}
      </div>
    </div>
  );
};

export default InfoRow;
