import { IAttribute, IDetailSection } from '@/types';
import DetailSection from './empty-detail-section';
import AttributeDetailSection from './attribute-detail-section';
import NoteDetailSection from './note-detail-section';
import EditSectionDialog from '../dialog/edit-section-dialog';

interface IDetailContainerProps {
  data: IDetailSection[];
  onSectionAdded: (section: IDetailSection) => void;
  onAttributeAdded: (attribute: IAttribute, section: IDetailSection) => void;
  onNoteChange: (noteContent: string, section: IDetailSection) => void;
}

const DetailContainer: React.FC<IDetailContainerProps> = ({
  data,
  onSectionAdded,
  onAttributeAdded,
  onNoteChange,
}) => {
  let detailContent = (
    <DetailSection
      onSectionAdded={onSectionAdded}
      title='Create a section to get started!'
      description='Sections let you group bits of related information together. Click below to see how it works.'
    />
  );

  if (data.length) {
    detailContent = (
      <>
        {data.map((section) => {
          if (section.type === 'attribute') {
            return (
              <AttributeDetailSection
                onAttributeAdded={onAttributeAdded}
                key={section.title}
                section={section}
                emptyAttributesPlaceholder='A new section! You can edit the Title or add attributes below.'
              />
            );
          }

          if (section.type === 'note') {
            return (
              <NoteDetailSection
                onNoteChange={onNoteChange}
                key={section.title}
                section={section}
                emptyNotePlaceholder='Click here to add some details'
              />
            );
          }
        })}

        <EditSectionDialog
          addMode
          buttonVariant='ghost'
          onSave={onSectionAdded}
        />
      </>
    );
  }

  return (
    <div className='grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {detailContent}
    </div>
  );
};

export default DetailContainer;
