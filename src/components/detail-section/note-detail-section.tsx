import { IDetailSection } from '@/types';
import EditNoteDialog from '../dialog/edit-note-dialog';
import { Button } from '../ui/button';
import EditOverlay from '../common/edit-overlay';
import { useRef } from 'react';

interface INoteDetailSectionProps {
  section: IDetailSection;
  emptyNotePlaceholder: string;
  onNoteChange: (noteContent: string, section: IDetailSection) => void;
}

const NoteDetailSection: React.FC<INoteDetailSectionProps> = ({
  section,
  emptyNotePlaceholder,
  onNoteChange,
}) => {
  const editNoteDialogRef = useRef<HTMLButtonElement>(null);

  return (
    <div key={section.title} className='rounded-xl bg-muted/50 p-3'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-center md:text-left'>
        {section.title}
      </h4>
      <div className='relative h-full w-full'>
        {section.noteContent && <p>{section.noteContent}</p>}
        {!section.noteContent && (
          <p className='italic text-secondary-foreground text-center'>
            {emptyNotePlaceholder}
          </p>
        )}
        <EditNoteDialog
          onSave={(noteContent) => onNoteChange(noteContent, section)}
        >
          <Button variant='ghost' ref={editNoteDialogRef} />
        </EditNoteDialog>
        <EditOverlay
          className='rounded-sm'
          onClick={() => editNoteDialogRef.current?.click()}
        />
      </div>
    </div>
  );
};

export default NoteDetailSection;
