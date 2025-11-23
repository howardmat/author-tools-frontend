import { IAttribute, IDetailSection } from '@/types';
import EditAttributeDialog from '../dialog/edit-attribute-dialog';
import DetailSectionHeader from './detail-section-header';
import AttributeDetail from './attribute-detail';

interface IAttributeDetailSectionProps {
  section: IDetailSection;
  emptyAttributesPlaceholder: string;
  onAttributeAdded: (attribute: IAttribute, section: IDetailSection) => void;
  onAttributeChange: (attribute: IAttribute, section: IDetailSection) => void;
  onAttributeDelete: (id: string, section: IDetailSection) => void;
  onSectionChange: (section: IDetailSection) => void;
  onSectionDelete: (id: string) => void;
}

export default function AttributeDetailSection({
  section,
  emptyAttributesPlaceholder,
  onAttributeAdded,
  onAttributeChange,
  onAttributeDelete,
  onSectionChange,
  onSectionDelete,
}: IAttributeDetailSectionProps) {
  return (
    <>
      <div key={section.title} className='rounded-xl bg-muted/50 p-3'>
        <DetailSectionHeader
          section={section}
          onSectionChange={onSectionChange}
          onSectionDelete={onSectionDelete}
        />

        {!section.attributes.length && (
          <div className='my-4 px-2 grid grid-cols-1 justify-center text-center relative'>
            <p className='leading-7 [&:not(:first-child)]:mt-6'>
              {emptyAttributesPlaceholder}
            </p>
            <div className='mt-6'>
              <EditAttributeDialog
                addMode
                onSave={(attribute) => onAttributeAdded(attribute, section)}
              />
            </div>
          </div>
        )}
        {section.attributes.length > 0 && (
          <>
            <div className='my-4 px-2 relative'>
              {section.attributes.map((attribute) => (
                <AttributeDetail
                  key={attribute.id}
                  attribute={attribute}
                  onSave={(attribute) => onAttributeChange(attribute, section)}
                  onDelete={(id) => onAttributeDelete(id, section)}
                />
              ))}
            </div>
            <div className='text-center'>
              <EditAttributeDialog
                addMode
                buttonVariant='ghost'
                onSave={(attribute) => onAttributeAdded(attribute, section)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
