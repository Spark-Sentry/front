'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { postBuilding } from '@/lib/endpoints/buildings';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as z from 'zod';
import { BuildingSchema } from '@/lib/schemas/buildings';

const BUILDING_GROUPS = ['Hotel', 'Office', 'Residential', 'Commercial', 'Industrial'] as const;

interface NewBuildingFormProps {
  onSuccess: () => void;
}

export const NewBuildingForm = ({ onSuccess }: NewBuildingFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BuildingSchema>>({
    resolver: zodResolver(BuildingSchema),
    defaultValues: {
      name: '',
      address: '',
      group: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof BuildingSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      try {
        await postBuilding(values);
        setSuccess('Building created successfully!');
        form.reset();
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } catch (error: any) {
        setError(error.message || 'An error occurred while creating the building');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Hotel Armon Plaza" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="6600 De la Côte-de-Liesse Rd, Saint-Laurent, QC H4T 1E3"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a building group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUILDING_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Building'}
        </Button>
      </form>
    </Form>
  );
};
