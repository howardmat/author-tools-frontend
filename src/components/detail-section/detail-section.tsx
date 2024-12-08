const DetailSection: React.FC = () => {
  return (
    <div className='rounded-xl bg-muted/50 p-3'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-center'>
        Create a section to get started!
      </h4>
      <div className='my-4 px-2 grid grid-cols-1 justify-center text-center relative'>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          Sections let you group bits of related information together. Click
          below to see how it works.
        </p>
        <div className='mt-6'>
          <EditSectionDialog addMode onSave={handleAddSection} />
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
