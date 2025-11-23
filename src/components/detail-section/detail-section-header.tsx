import { useRef } from 'react';
import EditSectionDialog from '../dialog/edit-section-dialog';
import { Button } from '../ui/button';
import { IDetailSection } from '@/types';
import EditOverlay from '../common/edit-overlay';

interface IDetailSectionHeaderProps {
  section?: IDetailSection;
  title?: string;
  centerHeader?: boolean;
  onSectionChange?: (section: IDetailSection) => void;
  onSectionDelete?: (id: string) => void;
}

export default function DetailSectionHeader ({
  section,
  title,
  centerHeader,
  onSectionChange,
  onSectionDelete,
}: IDetailSectionHeaderProps) {
  const editSectionDialogRef = useRef<HTMLButtonElement>(null);

  const headerTextAlignStyle = centerHeader
    ? 'text-center'
    : 'text-center md:text-left';

  return (
    <div className='relative'>
      <h4
        className={`scroll-m-20 text-xl font-semibold tracking-tight text-center ${headerTextAlignStyle}`}
      >
        {section?.title || title}
      </h4>
      {section?.title && onSectionChange && (
        <>
          <EditSectionDialog
            onSave={(section) => onSectionChange(section)}
            onDelete={(id) => (onSectionDelete ? onSectionDelete(id) : {})}
            section={section}
          >
            <Button
              className='absolute'
              variant='ghost'
              ref={editSectionDialogRef}
            />
          </EditSectionDialog>
          <EditOverlay
            className='rounded-sm'
            opacity='50'
            onClick={() => editSectionDialogRef.current?.click()}
          />
        </>
      )}
    </div>
  );
}
