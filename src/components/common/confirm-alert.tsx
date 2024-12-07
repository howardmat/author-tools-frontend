import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeaderContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

interface ConfirmAlertProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  declineLabel?: string;
  icon?: 'question' | 'exclamation';
  variant?: 'destructive';
  onConfirm?: () => void;
  onDecline?: () => void;
}

export interface IConfirmAlert {
  show: (props?: ConfirmAlertProps) => void;
}

const ConfirmAlert = forwardRef<IConfirmAlert, ConfirmAlertProps>(
  (
    {
      title,
      description,
      confirmLabel,
      declineLabel,
      icon,
      variant,
      onConfirm,
      onDecline,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [stateProps, setStateProps] = useState<ConfirmAlertProps>({
      title,
      description,
      confirmLabel,
      declineLabel,
      icon,
      variant,
      onConfirm,
      onDecline,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      show: (props?: ConfirmAlertProps) => {
        if (props) {
          setStateProps({ ...props });
        }
        setOpen(true);
      },
    }));

    let iconStyle = 'size-16 flex-none';
    let buttonVariant: 'destructive' | 'default' = 'default';
    if (stateProps.variant === 'destructive') {
      iconStyle += ' text-destructive';
      buttonVariant = stateProps.variant;
    }

    let iconContent;
    if (stateProps.icon === 'question') {
      iconContent = <QuestionMarkCircleIcon className={iconStyle} />;
    }

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger ref={buttonRef} />
        <AlertDialogContent>
          <AlertDialogHeader>
            {iconContent}
            <AlertDialogHeaderContent>
              <AlertDialogTitle>{stateProps.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {stateProps.description}
              </AlertDialogDescription>
            </AlertDialogHeaderContent>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {stateProps.declineLabel && (
              <AlertDialogCancel onClick={stateProps.onDecline}>
                {stateProps.declineLabel}
              </AlertDialogCancel>
            )}
            <Button variant={buttonVariant} asChild>
              <AlertDialogAction onClick={stateProps.onConfirm}>
                {stateProps.confirmLabel}
              </AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default ConfirmAlert;
