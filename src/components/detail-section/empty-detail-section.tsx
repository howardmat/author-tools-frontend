import { IDetailSection } from '@/types';
import EditSectionDialog from '../dialog/edit-section-dialog';
import DetailSectionHeader from './detail-section-header';

interface IDetailSectionProps {
  title: string;
  description: string;
  onSectionAdded: (section: IDetailSection) => void;
}

const EmptyDetailSection: React.FC<IDetailSectionProps> = ({
  title,
  description,
  onSectionAdded,
}) => {
  return (
    <div className='rounded-xl bg-muted/50 p-3'>
      <DetailSectionHeader title={title} centerHeader />
      <div className='my-4 px-2 grid grid-cols-1 justify-center relative text-center'>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>{description}</p>
        <div className='mt-6'>
          <EditSectionDialog addMode onSave={onSectionAdded} />
        </div>
      </div>
    </div>
  );
};

export default EmptyDetailSection;
