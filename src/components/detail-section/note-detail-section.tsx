import { IDetailSection } from '@/types';
import EditNoteDialog from '../dialog/edit-note-dialog';
import { Button } from '../ui/button';
import EditOverlay from '../common/edit-overlay';
import { useRef } from 'react';
import DetailSectionHeader from './detail-section-header';

interface INoteDetailSectionProps {
  section: IDetailSection;
  emptyNotePlaceholder: string;
  onNoteChange: (noteContent: string, section: IDetailSection) => void;
  onSectionChange: (section: IDetailSection) => void;
  onSectionDelete: (id: string) => void;
}

export default function NoteDetailSection({
  section,
  emptyNotePlaceholder,
  onNoteChange,
  onSectionChange,
  onSectionDelete,
}: INoteDetailSectionProps) {
  const editNoteDialogRef = useRef<HTMLButtonElement>(null);

  return (
    <div key={section.title} className='rounded-xl bg-muted/50 p-3 relative'>
      <DetailSectionHeader
        section={section}
        onSectionChange={onSectionChange}
        onSectionDelete={onSectionDelete}
      />
      <div className='relative h-max w-full'>
        {section.noteContent && <p>{section.noteContent}</p>}
        {!section.noteContent && (
          <p className='italic text-secondary-foreground text-center'>
            {emptyNotePlaceholder}
          </p>
        )}
        <EditNoteDialog
          onSave={(noteContent) => onNoteChange(noteContent, section)}
          currentNoteContent={section.noteContent}
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
}
