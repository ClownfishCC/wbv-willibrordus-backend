'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/cn'
import { DateField } from './type'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'
import { FieldValues } from '@payloadcms/plugin-form-builder/types'
import { Error } from '../Error'
import { Width } from '../Width'
import { Label } from '@/components/ui/label'

export const DatePicker: React.FC<
  DateField & {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({ name, control, errors, label, required, width }) => (
  <Width width={width}>
    <Label htmlFor={name}>{label}</Label>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !value && 'text-muted-foreground',
                )}
              >
                {value ? format(value as string, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background" align="start">
              <Calendar
                required
                captionLayout="dropdown"
                mode="single"
                selected={new Date(value as string)}
                onSelect={onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
              />
            </PopoverContent>
          </Popover>
        )
      }}
      rules={{ required }}
    />
    {required && errors[name] && <Error name={name} />}
  </Width>
)
