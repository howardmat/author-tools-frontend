import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ICodeValue } from '@/types';

interface ComboBoxProps {
  label: string;
  name: string;
  options: ICodeValue[];
  placeholder?: string;
  searchLabel?: string;
  noMatchLabel?: string;
  description?: string;
}

export default function ComboBox({
  label,
  name,
  options,
  placeholder,
  searchLabel,
  noMatchLabel,
  description,
}: ComboBoxProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        let displayValue: React.ReactNode = <>{placeholder}</>;

        if (field.value) {
          const option = options.find((option) => option.code === field.value);
          if (option) {
            displayValue = option.displayValue ?? <>{option.value}</>;
          }
        }
        return (
          <FormItem className='flex flex-col'>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {displayValue}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput
                    className='my-1'
                    placeholder={searchLabel ?? 'Search options...'}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {noMatchLabel ?? 'No match found.'}
                    </CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.value}
                          key={option.code}
                          onSelect={() => {
                            form.setValue(name, option.code);
                          }}
                        >
                          {option.displayValue || option.value}
                          <Check
                            className={cn(
                              'ml-auto',
                              option.code === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
