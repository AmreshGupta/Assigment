import React from 'react';
import { ConnectionStatus } from '../../types';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface Props {
  status: ConnectionStatus;
}

export const ConnectionBadge: React.FC<Props> = ({ status }) => {
  const getBadgeContent = () => {
    switch (status) {
      case 'connected':
        return {
          label: 'Connected',
          className: 'connected',
          icon: <Wifi size={14} className="text-emerald-400" />,
        };
      case 'connecting':
      case 'reconnecting':
        return {
          label: status === 'reconnecting' ? 'Reconnecting...' : 'Connecting...',
          className: 'reconnecting',
          icon: <RefreshCw size={14} className="animate-spin text-amber-400" />,
        };
      case 'disconnected':
      default:
        return {
          label: 'Offline',
          className: 'offline',
          icon: <WifiOff size={14} className="text-red-400" />,
        };
    }
  };

  const { label, className, icon } = getBadgeContent();

  return (
    <div className={`connection-badge ${className}`}>
      <span className="connection-dot"></span>
      {icon}
      <span>{label}</span>
    </div>
  );
};
