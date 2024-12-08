import { IDetailSection } from '@/types';
import DetailSection from './detail-section';

interface IDetailContainerProps {
  data: IDetailSection[];
}

const DetailContainer: React.FC<IDetailContainerProps> = ({ data }) => {
  let detailContent = <DetailSection />;

  if (data.length) {
    detailContent = (
      <>
        {data.map((section) => (
          <div key={section.title} className='rounded-xl bg-muted/50 p-3'>
            <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-center md:text-left'>
              {section.title}
            </h4>
            {section.type === 'attribute' && (
              <>
                {!section.attributes.length && (
                  <div className='my-4 px-2 grid grid-cols-1 justify-center text-center relative'>
                    <p className='leading-7 [&:not(:first-child)]:mt-6'>
                      A new section! You can edit the Title or add attributes
                      below.
                    </p>
                    <div className='mt-6'>
                      <EditAttributeDialog
                        addMode
                        onSave={(attribute) =>
                          handleAddAttribute(attribute, section)
                        }
                      />
                    </div>
                  </div>
                )}
                {section.attributes.length > 0 && (
                  <>
                    <div className='my-4 px-2 relative'>
                      {section.attributes.map((attribute) => (
                        <div
                          key={attribute.label}
                          className='grid grid-cols-2 gap-2'
                        >
                          <div className='text-right font-semibold'>
                            {attribute.label}
                          </div>
                          <div className='text-left'>{attribute.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className='text-center'>
                      <EditAttributeDialog
                        addMode
                        buttonVariant='ghost'
                        onSave={(attribute) =>
                          handleAddAttribute(attribute, section)
                        }
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {section.type === 'note' && (
              <div className='relative h-full w-full'>
                {section.noteContent && <p>{section.noteContent}</p>}
                {!section.noteContent && (
                  <p className='italic text-secondary-foreground text-center'>
                    Click here to add some details
                  </p>
                )}
                <EditNoteDialog
                  onSave={(noteContent) => handleAddNote(noteContent, section)}
                >
                  <Button variant='ghost' ref={editNoteDialogRef} />
                </EditNoteDialog>
                <EditOverlay
                  className='rounded-sm'
                  onClick={() => editNoteDialogRef.current?.click()}
                />
              </div>
            )}
          </div>
        ))}
        <EditSectionDialog
          addMode
          buttonVariant='ghost'
          onSave={handleAddSection}
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
