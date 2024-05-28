'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {PlusIcon} from "lucide-react";

interface Building {
    id: number;
    name: string;
    address: string;
}

const buildings: Building[] = [
    { id: 1, name: "Acme Apartments", address: "123 Main St" },
    { id: 2, name: "Riverfront Lofts", address: "456 Elm St" },
    { id: 3, name: "Skyview Towers", address: "789 Oak St" }
];

const AddEnergyBillModal: React.FC = () => {
    return (
        <Dialog defaultOpen>
            <DialogTrigger asChild>
                <Button className="h-7"> <PlusIcon className="mr-2"/>Energy Bill</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Energy Bill</DialogTitle>
                    <DialogDescription>Enter the details of your energy bill.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right" htmlFor="source">
                            Building
                        </Label>
                        <Select defaultValue="-">
                            <SelectTrigger>
                                <SelectValue placeholder="Select building"/>
                            </SelectTrigger>
                            {buildings.map(building => (
                                <SelectContent key={building.id}>
                                    <SelectItem value={building.name}>{building.name}</SelectItem>
                                </SelectContent>
                            ))}
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right" htmlFor="source">
                            Source
                        </Label>
                        <Select defaultValue="electricity">
                            <SelectTrigger>
                                <SelectValue placeholder="Select source"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="electricity">Electricity</SelectItem>
                                <SelectItem value="natural-gas">Natural Gas</SelectItem>
                                <SelectItem value="water">Water</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right" htmlFor="consumption">
                            Consumption
                        </Label>
                        <Input id="consumption" placeholder="Enter consumption" type="number"/>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right" htmlFor="rate">
                            Rate
                        </Label>
                        <Input id="rate" placeholder="Enter rate" type="number"/>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right" htmlFor="start-date">
                            Billing Period
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            <Input id="start-date" type="date"/>
                            <Input id="end-date" type="date"/>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                    <div>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddEnergyBillModal;
