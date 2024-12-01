import { PropsWithChildren } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CardProps extends PropsWithChildren {
  title?: string;
  className?: string;
  noPad?: boolean;
}

const AppCard: React.FC<CardProps> = ({
  className,
  title,
  noPad,
  children,
}) => {
  let contentClassName = '';
  if (noPad) contentClassName = 'p-0';

  return (
    <Card className={`w-[350px] ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
};

export default AppCard;
