'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewBuildingForm } from '@/components/building/new-building-form';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useSWR from 'swr';
import { getBuildings } from '@/lib/endpoints/buildings';
import { Skeleton } from '@/components/ui/skeleton';

const BuildingSkeleton = () => (
  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-6 w-full" />
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-6 w-1/2" />
  </div>
);

export const BuildingsWrapper = () => {
  const { data: buildings, error: buildingsError, isLoading, mutate } = useSWR('/buildings', getBuildings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuildingAdded = async () => {
    setIsModalOpen(false);
    await mutate();
  };

  console.log('buildings:', buildings);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Buildings</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>Add a new building</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Building</DialogTitle>
              </DialogHeader>
              <NewBuildingForm onSuccess={handleBuildingAdded} />
            </DialogContent>
          </Dialog>
        </div>

        {buildingsError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load buildings. Please try again later.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-gray-200 pb-4 font-medium dark:border-gray-700">
          <div>Building Name</div>
          <div>Address</div>
          <div>Time to ROI</div>
          <div>Return</div>
        </div>

        <div className="grid gap-4 mt-4">
          {isLoading ? (
            <>
              <BuildingSkeleton />
              <BuildingSkeleton />
              <BuildingSkeleton />
            </>
          ) : buildings?.length ? (
            buildings.map((building) => (
              <Link
                key={building.ID}
                href={`/buildings/${building.ID}`}
                className="block rounded-md border transition-all hover:shadow-md"
              >
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="font-medium">{building.Name}</div>
                  <div className="text-gray-500 dark:text-gray-400">{building.Address}</div>
                  {/*<div className="text-gray-500 dark:text-gray-400">{building.timeToROI || 'N/A'}</div>*/}
                  {/*<div className="font-medium">{building.return ? `${building.return}%` : 'N/A'}</div>*/}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No buildings found. Add your first building to get started.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
