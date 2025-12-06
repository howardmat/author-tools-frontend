import {
  BreadcrumbActionTypes,
  SetBreadcrumbTrailAction,
  SetUserSettingsAction,
  UserSettingsActionTypes,
} from '@/actions';
import PageHeading from '@/components/common/page-heading';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { THEMES } from '@/lib/constants';
import { useUserSettingsContext } from '@/store/user-settings/use-user-settings-context';
import useBodyClass from '@/hooks/use-body-class';
import { toast } from 'sonner';
import { usePostUserSettingMutation, usePutUserSettingMutation } from '@/hooks/use-usersetting-query';

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
            <Form {...form}>
              <form className='w-2/3 space-y-6'>
                <FormField
                  control={form.control}
                  name='theme'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormControl>
                        <RadioGroup
                          onValueChange={handleThemeChange}
                          defaultValue={field.value}
                          className='flex flex-col space-y-1'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={THEMES.LIGHT} />
                            </FormControl>
                            <FormLabel className='font-normal'>Light</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={THEMES.DARK} />
                            </FormControl>
                            <FormLabel className='font-normal'>Dark</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={THEMES.DARK_ORANGE} />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              Orange
                            </FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={THEMES.DARK_BLUE} />
                            </FormControl>
                            <FormLabel className='font-normal'>Blue</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={THEMES.DARK_VIOLET} />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              Violet
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
