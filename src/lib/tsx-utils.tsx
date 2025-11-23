import {
  Activity,
  Anvil,
  Aperture,
  Atom,
  Biohazard,
  Bird,
  Component,
  Webhook,
} from 'lucide-react';

export const getWorkspaceIcon = (iconName?: string) => {
  const className = 'size-4 shrink-0';
  switch (iconName) {
    case 'activity':
      return <Activity className={className} />;
    case 'anvil':
      return <Anvil className={className} />;
    case 'aperture':
      return <Aperture className={className} />;
    case 'atom':
      return <Atom className={className} />;
    case 'biohazard':
      return <Biohazard className={className} />;
    case 'bird':
      return <Bird className={className} />;
    case 'component':
      return <Component className={className} />;
    case 'webhook':
    case 'DEFAULT':
    default:
      return <Webhook className={className} />;
  }
};
