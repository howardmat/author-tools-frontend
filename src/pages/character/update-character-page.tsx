import { useParams } from 'react-router-dom';
import { useGetCharacterQuery, usePutCharacterMutation } from '@/http';
import { SubmitHandler } from 'react-hook-form';
import LoadingIndicator from '@/components/common/loading-indicator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { ActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import HeaderDetailForm, {
  HeaderFormData,
} from '@/components/form/header-detail-form';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Character } from '@/types';

const UpdateCharacterPage: React.FC = () => {
  const { toast } = useToast();
  const [characterState, setCharacterState] = useState<Character | null>(null);
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: ActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [{ name: 'Characters', url: '/characters' }, { name: 'Edit' }],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();
  const characterId = params['id'] || '';

  const { data, isPending } = useGetCharacterQuery(characterId);

  useEffect(() => {
    if (data) {
      setCharacterState(data);
    }
  }, [data]);

  const { mutate, isPending: isPutPending } = usePutCharacterMutation({
    onSuccess: () => {
      toast({
        title: 'Awesome!',
        description: 'Your character has been saved',
        variant: 'success',
      });
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred.',
        variant: 'destructive',
      });
    },
  });

  const handleSave: SubmitHandler<HeaderFormData> = async (headerData) => {
    if (characterState) {
      mutate({
        id: characterId,
        character: {
          ...characterState,
          ...headerData,
        },
      });
    }
  };

  const handleAddSectionClick = () => {
    if (characterState) {
      const characterStateCopy = {
        ...characterState,
        detailSections: [...characterState.detailSections],
      };
      characterStateCopy.detailSections.push({
        title: 'Test',
        type: 'attribute',
        noteContent: '',
        attributes: [],
      });
      setCharacterState(characterStateCopy);
    }
  };

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (characterState) {
    const headerFormData: HeaderFormData = {
      name: characterState.name,
      imageFileId: characterState.imageFileId,
    };

    let detailContent = (
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
            <Button type='button' onClick={handleAddSectionClick}>
              <PlusCircleIcon /> Create Section
            </Button>
          </div>
        </div>
      </div>
    );

    if (characterState.detailSections.length) {
      detailContent = (
        <>
          {characterState.detailSections.map((section) => (
            <div key={section.title} className='rounded-xl bg-muted/50 p-3'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-center md:text-left'>
                {section.title}
              </h4>
              <div className='my-4 px-2 grid grid-cols-1 justify-center text-center relative'>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>
                  A new section! You can edit the Title or add attributes below.
                </p>
              </div>
            </div>
          ))}
        </>
      );
    }

    content = (
      <>
        <HeaderDetailForm
          data={headerFormData}
          isLoading={isPutPending}
          onSave={handleSave}
        />
        <div className='mt-8'>
          <div className='grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {detailContent}
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default UpdateCharacterPage;
