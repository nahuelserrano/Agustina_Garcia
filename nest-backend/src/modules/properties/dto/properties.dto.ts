import { IsOptional, IsString, IsNumber, Min, Max, IsEnum, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export enum CurrencyEnum {
  USD = 'USD',
  ARS = 'ARS',
}

export class GetPropertiesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  pageSize: number = 12;

  @IsOptional()
  @IsString()
  operacion?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minValue?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxValue?: number;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency?: CurrencyEnum;

  @IsOptional()
  @IsIn(['1', '2', '3plus'])
  bedrooms?: string;

  @IsOptional()
  @IsIn(['1', '2', '3plus'])
  bathrooms?: string;

  @IsOptional()
  @IsIn(['true', 'false'])
  garage?: string;
}

export interface PropertyPrice {
  currency: CurrencyEnum;
  amount: number;
  hidden: boolean;
}

export interface PropertyLocation {
  city: string;
  address?: string;
  neighborhood?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PropertyFeatures {
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  coveredSurface?: number;
  totalSurface?: number;
  garage?: number;
}

export interface PublicPropertyDto {
  id: string;
  slug: string;
  title: string;
  description: string;
  operation: string;
  propertyType: string;
  price: PropertyPrice;
  location: PropertyLocation;
  features: PropertyFeatures;
  images: string[];
  publishedAt: string;
  condition?: string;
  antiquityYears?: number;
  orientation?: string;
  services?: string[];
  expensas?: string;
  isMortgageEligible?: boolean;
}

export interface PaginatedPropertiesResponse {
  items: PublicPropertyDto[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
