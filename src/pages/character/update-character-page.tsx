import { useParams } from 'react-router-dom';
import { useGetCharacterQuery, usePutCharacterMutation } from '@/http';
import { SubmitHandler } from 'react-hook-form';
import LoadingIndicator from '@/components/common/loading-indicator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { BreadcrumbActionTypes, SetBreadcrumbTrailAction } from '@/actions';
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
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
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

  const handleNoteChange = (noteContent: string, section: IDetailSection) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      const sectionCopy = characterStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.noteContent = noteContent;

      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
    }
  };

  const handleAddSection = (section: IDetailSection) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      characterStateCopy.detailSections.push({ ...section });

      mutate({
        id: characterId,
        character: {
          ...characterState,
          ...characterStateCopy,
        },
      });
    }
  };

  const handleSectionChange = (section: IDetailSection) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      const sectionCopy = characterStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.title = section.title;

      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
    }
  };

  const handleDeleteSection = (id: string) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      characterStateCopy.detailSections =
        characterStateCopy.detailSections.filter((s) => s.id !== id);

      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
    }
  };

  const handleAddAttribute = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      const sectionCopy = characterStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes.push(attribute);

      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
    }
  };

  const handleAttributeChange = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      const sectionCopy = characterStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      const attributeCopy = sectionCopy.attributes.find(
        (a) => a.id === attribute.id
      );
      if (!attributeCopy) throw new Error('Attribute was not found to update');

      attributeCopy.label = attribute.label;
      attributeCopy.value = attribute.value;

      mutate({
        id: characterId,
        character: {
          ...characterStateCopy,
        },
      });
    }
  };

  const handleDeleteAttribute = (id: string, section: IDetailSection) => {
    if (characterState) {
      const characterStateCopy = JSON.parse(
        JSON.stringify(characterState)
      ) as ICharacter;

      const sectionCopy = characterStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes = sectionCopy.attributes.filter(
        (a) => a.id !== id
      );

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
            onSectionChange={handleSectionChange}
            onSectionDelete={handleDeleteSection}
            onAttributeAdded={handleAddAttribute}
            onAttributeDelete={handleDeleteAttribute}
            onAttributeChange={handleAttributeChange}
            onNoteChange={handleNoteChange}
          />
        </div>
      </>
    );
  }

  return content;
};

export default UpdateCharacterPage;
