import { IAttribute, IDetailSection } from '@/types';
import EditAttributeDialog from '../dialog/edit-attribute-dialog';

interface IAttributeDetailSectionProps {
  section: IDetailSection;
  emptyAttributesPlaceholder: string;
  onAttributeAdded: (attribute: IAttribute, section: IDetailSection) => void;
}

const AttributeDetailSection: React.FC<IAttributeDetailSectionProps> = ({
  section,
  emptyAttributesPlaceholder,
  onAttributeAdded,
}) => {
  return (
    <>
      <div key={section.title} className='rounded-xl bg-muted/50 p-3'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-center md:text-left'>
          {section.title}
        </h4>
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
                <div key={attribute.label} className='grid grid-cols-2 gap-2'>
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
                onSave={(attribute) => onAttributeAdded(attribute, section)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AttributeDetailSection;
