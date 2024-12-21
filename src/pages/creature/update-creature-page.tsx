import { useParams } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import LoadingIndicator from '@/components/common/loading-indicator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { BreadcrumbActionTypes, SetBreadcrumbTrailAction } from '@/actions';
import HeaderDetailForm, {
  HeaderFormData,
} from '@/components/form/header-detail-form';
import { IAttribute, IEntity, IDetailSection, EntityQueryType } from '@/types';
import DetailContainer from '@/components/detail-section/detail-container';
import {
  useGetEntityQuery,
  usePutEntityMutation,
} from '@/hooks/use-entity-query';

const UpdateCreaturePage: React.FC = () => {
  const { toast } = useToast();
  const [creatureState, setCreatureState] = useState<IEntity | null>(null);
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [{ name: 'Creatures', url: '/creatures' }, { name: 'Edit' }],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();
  const creatureId = params['id'] || '';

  const { data, isPending } = useGetEntityQuery(
    EntityQueryType.creature,
    creatureId
  );

  useEffect(() => {
    if (data) {
      setCreatureState(data);
    }
  }, [data]);

  const { mutate, isPending: isPutPending } = usePutEntityMutation(
    EntityQueryType.creature,
    {
      onSuccess: (creature) => {
        toast({
          title: 'Awesome!',
          description: 'Your creature has been saved',
          variant: 'success',
        });
        setCreatureState(creature);
      },
      onError: (error?: Error) => {
        toast({
          title: 'Error!',
          description: error?.message ?? 'An unexpected error occurred.',
          variant: 'destructive',
        });
      },
    }
  );

  const handleHeaderSave: SubmitHandler<HeaderFormData> = async (
    headerData
  ) => {
    if (creatureState) {
      mutate({
        id: creatureId,
        entity: {
          ...creatureState,
          ...headerData,
        },
      });
    }
  };

  const handleNoteChange = (noteContent: string, section: IDetailSection) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      const sectionCopy = creatureStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.noteContent = noteContent;

      mutate({
        id: creatureId,
        entity: {
          ...creatureStateCopy,
        },
      });
    }
  };

  const handleAddSection = (section: IDetailSection) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      creatureStateCopy.detailSections.push({ ...section });

      mutate({
        id: creatureId,
        entity: {
          ...creatureState,
          ...creatureStateCopy,
        },
      });
    }
  };

  const handleSectionChange = (section: IDetailSection) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      const sectionCopy = creatureStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.title = section.title;

      mutate({
        id: creatureId,
        entity: {
          ...creatureStateCopy,
        },
      });
    }
  };

  const handleDeleteSection = (id: string) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      creatureStateCopy.detailSections =
        creatureStateCopy.detailSections.filter((s) => s.id !== id);

      mutate({
        id: creatureId,
        entity: {
          ...creatureStateCopy,
        },
      });
    }
  };

  const handleAddAttribute = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      const sectionCopy = creatureStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes.push(attribute);

      mutate({
        id: creatureId,
        entity: {
          ...creatureStateCopy,
        },
      });
    }
  };

  const handleAttributeChange = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      const sectionCopy = creatureStateCopy.detailSections.find(
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
        id: creatureId,
        entity: {
          ...creatureStateCopy,
        },
      });
    }
  };

  const handleDeleteAttribute = (id: string, section: IDetailSection) => {
    if (creatureState) {
      const creatureStateCopy = JSON.parse(
        JSON.stringify(creatureState)
      ) as IEntity;

      const sectionCopy = creatureStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes = sectionCopy.attributes.filter(
        (a) => a.id !== id
      );

      mutate({
        id: creatureId,
        entity: {
          ...creatureStateCopy,
        },
      });
    }
  };

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (creatureState) {
    const headerFormData: HeaderFormData = {
      name: creatureState.name,
      imageFileId: creatureState.imageFileId,
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
            data={creatureState.detailSections}
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

export default UpdateCreaturePage;
