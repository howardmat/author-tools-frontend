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

const UpdateLocationPage: React.FC = () => {
  const { toast } = useToast();
  const [locationState, setLocationState] = useState<IEntity | null>(null);
  const { dispatch } = useBreadcrumbContext();

  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [{ name: 'Locations', url: '/locations' }, { name: 'Edit' }],
    };
    dispatch(setBreadcrumbTrailAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();
  const locationId = params['id'] || '';

  const { data, isPending } = useGetEntityQuery(
    EntityQueryType.location,
    locationId
  );

  useEffect(() => {
    if (data) {
      setLocationState(data);
    }
  }, [data]);

  const { mutate, isPending: isPutPending } = usePutEntityMutation(
    EntityQueryType.location,
    {
      onSuccess: (location) => {
        toast({
          title: 'Awesome!',
          description: 'Your location has been saved',
          variant: 'success',
        });
        setLocationState(location);
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
    if (locationState) {
      mutate({
        id: locationId,
        entity: {
          ...locationState,
          ...headerData,
        },
      });
    }
  };

  const handleNoteChange = (noteContent: string, section: IDetailSection) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      const sectionCopy = locationStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.noteContent = noteContent;

      mutate({
        id: locationId,
        entity: {
          ...locationStateCopy,
        },
      });
    }
  };

  const handleAddSection = (section: IDetailSection) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      locationStateCopy.detailSections.push({ ...section });

      mutate({
        id: locationId,
        entity: {
          ...locationState,
          ...locationStateCopy,
        },
      });
    }
  };

  const handleSectionChange = (section: IDetailSection) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      const sectionCopy = locationStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.title = section.title;

      mutate({
        id: locationId,
        entity: {
          ...locationStateCopy,
        },
      });
    }
  };

  const handleDeleteSection = (id: string) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      locationStateCopy.detailSections =
        locationStateCopy.detailSections.filter((s) => s.id !== id);

      mutate({
        id: locationId,
        entity: {
          ...locationStateCopy,
        },
      });
    }
  };

  const handleAddAttribute = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      const sectionCopy = locationStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes.push(attribute);

      mutate({
        id: locationId,
        entity: {
          ...locationStateCopy,
        },
      });
    }
  };

  const handleAttributeChange = (
    attribute: IAttribute,
    section: IDetailSection
  ) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      const sectionCopy = locationStateCopy.detailSections.find(
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
        id: locationId,
        entity: {
          ...locationStateCopy,
        },
      });
    }
  };

  const handleDeleteAttribute = (id: string, section: IDetailSection) => {
    if (locationState) {
      const locationStateCopy = JSON.parse(
        JSON.stringify(locationState)
      ) as IEntity;

      const sectionCopy = locationStateCopy.detailSections.find(
        (s) => s.id === section.id
      );
      if (!sectionCopy) throw new Error('Section was not found to update');

      sectionCopy.attributes = sectionCopy.attributes.filter(
        (a) => a.id !== id
      );

      mutate({
        id: locationId,
        entity: {
          ...locationStateCopy,
        },
      });
    }
  };

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (locationState) {
    const headerFormData: HeaderFormData = {
      name: locationState.name,
      imageFileId: locationState.imageFileId,
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
            data={locationState.detailSections}
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

export default UpdateLocationPage;
