import {
  BreadcrumbActionTypes,
  SetBreadcrumbTrailAction,
  SetUserSettingsAction,
  UserSettingsActionTypes,
} from '@/actions';
import PageHeading from '@/components/common/page-heading';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { THEMES } from '@/lib/constants';
import { useUserSettingsContext } from '@/store/user-settings/use-user-settings-context';
import useBodyClass from '@/hooks/use-body-class';
import { usePostUserSettingMutation, usePutUserSettingMutation } from '@/http';
import { toast } from 'sonner';
import { FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

const FormSchema = z.object({
  theme: z.enum(
    [
      THEMES.LIGHT,
      THEMES.DARK,
      THEMES.DARK_ORANGE,
      THEMES.DARK_BLUE,
      THEMES.DARK_VIOLET,
    ],
    {
      message: 'You need to select a theme.',
    }
  ),
});

export default function SettingsPage() {
  const { dispatch } = useBreadcrumbContext();
  useEffect(() => {
    const setBreadcrumbTrailAction: SetBreadcrumbTrailAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_TRAIL,
      payload: [
        {
          name: 'Settings',
          url: '/settings',
        },
      ],
    };
    dispatch(setBreadcrumbTrailAction);
  }, [dispatch]);

  const { state: userSettingsState, dispatch: userSettingsDispatch } =
    useUserSettingsContext();
  const { setBodyClass } = useBodyClass();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      theme: userSettingsState.userSetting.theme || THEMES.LIGHT,
    },
    defaultValues: {
      theme: userSettingsState.userSetting.theme,
    },
  });

  useEffect(() => {
    form.reset({
      theme: userSettingsState.userSetting.theme,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSettingsState.userSetting.theme]);

  const onSuccessHandler = () => {
    toast.success('Awesome!', {
      description: 'Your settings have been saved',
    });
  };
  const onErrorHandler = (error?: Error) => {
    toast.error('Oops!', {
      description: error?.message ?? 'An unexpected error occurred.',
    });
  };

  const { mutate: putMutate } = usePutUserSettingMutation({
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });
  const { mutate: postMutate } = usePostUserSettingMutation({
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  const handleThemeChange = (value: string) => {
    setBodyClass(userSettingsState.userSetting.theme || THEMES.LIGHT, value);

    if (userSettingsState?.userSetting?.id) {
      putMutate({
        id: userSettingsState.userSetting.id,
        userSetting: {
          ...userSettingsState,
          theme: value,
        },
      });
    } else {
      postMutate({
        theme: value,
      });
    }

    const setUserSettingsThemeAction: SetUserSettingsAction = {
      type: UserSettingsActionTypes.SET_USERSETTINGS,
      payload: {
        ...userSettingsState.userSetting,
        theme: value,
      },
    };
    userSettingsDispatch(setUserSettingsThemeAction);
  };

  return (
    <>
      <PageHeading title='Settings' />
      <div className='space-y-12 rounded-xl bg-muted/50 p-3'>
        <div className='pb-6'>
          <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            Theme
          </h4>
          <div className='leading-7 [&:not(:first-child)]:mt-6 ml-2'>
            <form className='w-2/3 space-y-6'>
              <Controller
                control={form.control}
                name='theme'
                render={({ field, fieldState }) => (
                  <RadioGroup
                    onValueChange={handleThemeChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="option-light" value={THEMES.LIGHT} />
                      <Label htmlFor="option-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="option-dark" value={THEMES.DARK} />
                      <Label htmlFor="option-dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="option-dark-orange" value={THEMES.DARK_ORANGE} />
                      <Label htmlFor="option-dark-orange">Orange</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="option-dark-blue" value={THEMES.DARK_BLUE} />
                      <Label htmlFor="option-dark-blue">Blue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="option-dark-violet" value={THEMES.DARK_VIOLET} />
                      <Label htmlFor="option-dark-violet">Violet</Label>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </RadioGroup>
                )}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
