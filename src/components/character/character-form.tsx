import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CharacterFormData } from '../../types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import Card from '../card';
import CharacterLeftCardForm from './character-left-card-form';
import { Button } from '../ui/button';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  birthDate: z.date().optional(),
  alias: z.string(),
  archetype: z.string(),
  age: z.coerce.number(),
  profession: z.string(),
  loveInterest: z.string(),
  gender: z.string(),
  eyeColor: z.string(),
  hairType: z.string(),
  hairColor: z.string(),
  hairLength: z.string(),
  bodyShape: z.string(),
  personalTraits: z.string(),
  abilities: z.string(),
  strength: z.string(),
  weakness: z.string(),
  history: z.string(),
  familyHistory: z.string(),
  friendsAndFamily: z.string(),
  imageFileId: z.string(),
});

const CharacterForm: React.FC<{
  character: CharacterFormData | null;
  onSave: (data: CharacterFormData) => void;
  onCancel: () => void;
}> = ({ character, onSave, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...character,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as CharacterFormData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <CharacterLeftCardForm />
        <div className='col-span-2 flex flex-wrap justify-center gap-x-6 gap-y-6'>
          <Card title='Personal Traits' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='personalTraits'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Describe some of the character&lsquo;s personal traits'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          <Card title='Abilities' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='abilities'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Describe some of the character&lsquo;s abilities'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          <Card title='Strengths' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='strength'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Describe some of the character&lsquo;s strengths'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          <Card title='Weaknesses' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='weakness'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Describe some of the character&lsquo;s weaknesses'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          <Card title='History' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='history'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='What is the character&lsquo;s history?'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          <Card title='Family History' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='familyHistory'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Talk about the family history'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          <Card title='Friends and Family' className='w-full sm:w-64'>
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='friendsAndFamily'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='List some of their friends and family'
                          className='resize-none'
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
        </div>
        <div className='mt-6 clear-both'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default CharacterForm;
