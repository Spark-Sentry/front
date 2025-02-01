import { Icons } from '@/components/icons';

// --------------------- USER ---------------------

export type UserResponse = {
  data: string;
};

// --------------------- UI ---------------------

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

// --------------------- ENTITIES ---------------------

type Area = {
  // coming soon
};

export type Building = {
  AccountID: number;
  Address: string;
  Areas: Area[];
  CreatedAt: string;
  DeletedAt: string | null;
  Group: string;
  ID: number;
  Name: string;
  UpdatedAt: string;
};

export type Trendlog = {
  time: string; // ISO 8601 date format
  value: number;
  parameter: string;
  equipment: string;
  measurement: string;
  field: string;
  device: string;
  host_device: string;
  name: string;
};
