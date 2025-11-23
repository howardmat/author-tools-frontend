import { IAttribute } from '@/types';
import EditAttributeDialog from '../dialog/edit-attribute-dialog';
import { Button } from '../ui/button';
import EditOverlay from '../common/edit-overlay';
import { useRef } from 'react';

interface IAttributeDetailProps {
  attribute: IAttribute;
  onSave: (attribute: IAttribute) => void;
  onDelete: (id: string) => void;
}

export default function AttributeDetail({
  attribute,
  onSave,
  onDelete,
}: IAttributeDetailProps) {
  const editAttributeDialogRef = useRef<HTMLButtonElement>(null);

  return (
    <div className='grid grid-cols-2 gap-2 relative'>
      <div className='text-right font-semibold'>{attribute.label}</div>
      <div className='text-left'>{attribute.value}</div>
      <EditAttributeDialog
        onSave={(attribute) => onSave(attribute)}
        onDelete={(id) => onDelete(id)}
        attribute={attribute}
      >
        <Button
          className='absolute'
          variant='ghost'
          ref={editAttributeDialogRef}
        />
      </EditAttributeDialog>
      <EditOverlay
        className='rounded-sm'
        opacity='50'
        onClick={() => editAttributeDialogRef.current?.click()}
      />
    </div>
  );
}
