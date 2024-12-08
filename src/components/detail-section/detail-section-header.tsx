interface IDetailSectionHeaderProps {
  title: string;
  centerHeader?: boolean;
}

const DetailSectionHeader: React.FC<IDetailSectionHeaderProps> = ({
  title,
  centerHeader,
}) => {
  const headerTextAlignStyle = centerHeader
    ? 'text-center'
    : 'text-center md:text-left';

  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight text-center ${headerTextAlignStyle}`}
    >
      {title}
    </h4>
  );
};

export default DetailSectionHeader;
