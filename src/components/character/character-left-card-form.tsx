import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import DatePicker from '../ui/datepicker';
import cssClasses from './character-left-card-form.module.css';
import Card from '../card';
import { UserCircleIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const CharacterLeftCardForm: React.FC = () => {
  const form = useFormContext();

  return (
    <div
      className={'sm:float-left mb-6 mr-6 ' + cssClasses['static-left-card']}
    >
      <Card className='w-full sm:w-72'>
        <div className='flex justify-center items-center gap-x-3'>
          <UserCircleIcon
            aria-hidden='true'
            className='w-48 h-24 text-gray-300'
          />
          <button
            type='button'
            className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          >
            Change
          </button>
        </div>
        <div className='mt-3'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className={cssClasses['scrollable']}>
          <div className='mt-3 px-1 pb-1 grid gap-y-4'>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='What is their name?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='alias'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alias</FormLabel>
                    <FormControl>
                      <Input placeholder='Do they have an alias?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='archetype'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Archetype</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='What is their archetype?'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <DatePicker
                label='Birth Day'
                name='birthDate'
                placeholder='Just Month and Day'
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='age'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder='How old are they?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='profession'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input placeholder='What do they do?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='loveInterest'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Love Interest</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Do they have a love interest?'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder='What is their gender?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='eyeColor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eye Color</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='What color are their eyes?'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='hairType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hair Type</FormLabel>
                    <FormControl>
                      <Input placeholder='What type of hair?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='hairColor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hair Color</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='What color is their hair?'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='hairLength'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hair Length</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Describe the length of their hair'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='bodyShape'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Shape</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='What type of physique do they have?'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CharacterLeftCardForm;
