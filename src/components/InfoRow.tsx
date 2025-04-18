
import React from 'react';
import InfoTooltip from './InfoTooltip';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  tooltip: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, tooltip }) => {
  return (
    <div className="info-row">
      <div className="info-label">
        {label} <InfoTooltip content={tooltip} />
      </div>
      <div className="info-value">{value || 'Not available'}</div>
    </div>
  );
};

export default InfoRow;
