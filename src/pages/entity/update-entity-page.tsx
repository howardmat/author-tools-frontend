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

interface IUpdateEntityPageProps {
  entityType: EntityQueryType;
  title: string;
  entityBaseUrl: string;
  entityName?: string;
  breadcrumbTitle?: string;
}

const UpdateEntityPage: React.FC<IUpdateEntityPageProps> = ({
  entityType,
  title,
  entityBaseUrl,
  entityName,
  breadcrumbTitle,
}) => {
  const { toast } = useToast();
  const [entityState, setEntityState] = useState<IEntity | null>(null);
  const { dispatch } = useBreadcrumbContext();

  breadcrumbTitle = breadcrumbTitle || title;
  entityName = entityName || title;

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [
        { name: `${breadcrumbTitle}s`, url: entityBaseUrl },
        { name: 'Edit' },
      ],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();
  const entityId = params['id'] || '';

  const { data, isPending } = useGetEntityQuery(entityType, entityId);

  useEffect(() => {
    if (data) {
      setEntityState(data);
    }
  }, [data]);

  const { mutate, isPending: isPutPending } = usePutEntityMutation(entityType, {
    onSuccess: (entity) => {
      toast({
        title: 'Awesome!',
        description: `Your ${entityName} has been saved`,
        variant: 'success',
      });
      setEntityState(entity);
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
    if (entityState) {
      mutate({
        id: entityId,
        entity: {
          ...entityState,
          ...headerData,
        },
      });
    }
  };

  const handleNoteChange = (noteContent: string, section: IDetailSection) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      const sectionCopy = entityStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.noteContent = noteContent;

      mutate({
        id: entityId,
        entity: {
          ...entityStateCopy,
        },
      });
    }
  };

  const handleAddSection = (section: IDetailSection) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      entityStateCopy.detailSections.push({ ...section });

      mutate({
        id: entityId,
        entity: {
          ...entityState,
          ...entityStateCopy,
        },
      });
    }
  };

  const handleSectionChange = (section: IDetailSection) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      const sectionCopy = entityStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.title = section.title;

      mutate({
        id: entityId,
        entity: {
          ...entityStateCopy,
        },
      });
    }
  };

  const handleDeleteSection = (id: string) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      entityStateCopy.detailSections = entityStateCopy.detailSections.filter(
        (s) => s.id !== id
      );

      mutate({
        id: entityId,
        entity: {
          ...entityStateCopy,
        },
      });
    }
  };

  const handleAddAttribute = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      const sectionCopy = entityStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes.push(attribute);

      mutate({
        id: entityId,
        entity: {
          ...entityStateCopy,
        },
      });
    }
  };

  const handleAttributeChange = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      const sectionCopy = entityStateCopy.detailSections.find(
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
        id: entityId,
        entity: {
          ...entityStateCopy,
        },
      });
    }
  };

  const handleDeleteAttribute = (id: string, section: IDetailSection) => {
    if (entityState) {
      const entityStateCopy = JSON.parse(
        JSON.stringify(entityState)
      ) as IEntity;

      const sectionCopy = entityStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes = sectionCopy.attributes.filter(
        (a) => a.id !== id
      );

      mutate({
        id: entityId,
        entity: {
          ...entityStateCopy,
        },
      });
    }
  };

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (entityState) {
    const headerFormData: HeaderFormData = {
      name: entityState.name,
      imageFileId: entityState.imageFileId,
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
            data={entityState.detailSections}
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

export default UpdateEntityPage;
