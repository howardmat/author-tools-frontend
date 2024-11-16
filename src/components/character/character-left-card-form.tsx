import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
import ComboBox from '../ui/combobox';
import { ArchetypeOptions, GenderOptions } from '@/data/combobox-data';
import AvatarUpload from '../avatar-upload';
import Divider from '../divider';

interface CharacterLeftCardFormState {
  isScrollTop: boolean;
  isScrollBottom: boolean;
}

const initialState: CharacterLeftCardFormState = {
  isScrollTop: true,
  isScrollBottom: false,
};

const CharacterLeftCardForm: React.FC = () => {
  const form = useFormContext();
  const [state, setState] = useState<CharacterLeftCardFormState>(initialState);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const top = event.currentTarget.scrollTop === 0;
    if (top) {
      setState((prevState) => ({
        ...prevState,
        isScrollTop: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isScrollTop: false,
      }));
    }

    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;
    if (bottom) {
      setState((prevState) => ({
        ...prevState,
        isScrollBottom: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isScrollBottom: false,
      }));
    }
  };

  return (
    <div
      className={'sm:float-left mb-6 sm:mr-6 ' + cssClasses['static-left-card']}
    >
      <Card className='w-full sm:w-72 relative'>
        <AvatarUpload name='imageFileId' />
        <div className='my-6'>
          <div className='w-full border-t border-gray-300' />
        </div>
        {!state.isScrollTop && (
          <Divider
            className='absolute w-5/6 bg-white z-50 hidden sm:block'
            orientation='up'
          />
        )}
        <div className={cssClasses['scrollable']} onScroll={handleScroll}>
          <div className='px-1 pb-1 grid gap-y-4'>
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
              <ComboBox
                name='archetype'
                label='Archetype'
                placeholder='Select an Archetype'
                searchLabel='Search for an Archetype'
                noMatchLabel='No Archetype found'
                options={ArchetypeOptions}
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
              <ComboBox
                name='gender'
                label='Gender'
                placeholder='Select a Gender'
                searchLabel='Search for a Gender'
                noMatchLabel='No Gender found'
                options={GenderOptions}
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
        {!state.isScrollBottom && (
          <Divider
            className='absolute w-5/6 hidden sm:block'
            orientation='down'
          />
        )}
      </Card>
    </div>
  );
};

export default CharacterLeftCardForm;
