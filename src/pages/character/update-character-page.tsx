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
import { IAttribute, ICharacter, IDetailSection } from '@/types';
import DetailContainer from '@/components/detail-section/detail-container';

const UpdateCharacterPage: React.FC = () => {
  const { toast } = useToast();
  const [characterState, setCharacterState] = useState<ICharacter | null>(null);
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
    onSuccess: (character) => {
      toast({
        title: 'Awesome!',
        description: 'Your character has been saved',
        variant: 'success',
      });
      setCharacterState(character);
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred.',
        variant: 'destructive',
      });
    },
  });

  const handleHeaderSave: SubmitHandler<HeaderFormData> = async (
    headerData
  ) => {
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

  const handleAddSection = (section: IDetailSection) => {
    if (characterState) {
      const characterStateCopy = {
        ...characterState,
        detailSections: [...characterState.detailSections],
      };
      characterStateCopy.detailSections.push({
        title: section.title,
        type: section.type,
        noteContent: section.noteContent,
        attributes: section.attributes,
      });
      mutate({
        id: characterId,
        character: {
          ...characterState,
          ...characterStateCopy,
        },
      });
    }
  };

  const handleAddAttribute = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    section.attributes.push(attribute);
    if (characterState) {
      const characterStateCopy = {
        ...characterState,
        detailSections: [...characterState.detailSections],
      };
      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
    }
  };

  const handleNoteChange = (noteContent: string, section: IDetailSection) => {
    section.noteContent = noteContent;
    if (characterState) {
      const characterStateCopy = {
        ...characterState,
        detailSections: [...characterState.detailSections],
      };
      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
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

    content = (
      <>
        <HeaderDetailForm
          data={headerFormData}
          isLoading={isPutPending}
          onSave={handleHeaderSave}
        />
        <div className='mt-8'>
          <DetailContainer
            data={characterState.detailSections}
            onSectionAdded={handleAddSection}
            onAttributeAdded={handleAddAttribute}
            onNoteChange={handleNoteChange}
          />
        </div>
      </>
    );
  }

  return content;
};

export default UpdateCharacterPage;
