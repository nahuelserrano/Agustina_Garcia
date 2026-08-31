// import { IsString, IsEmail, IsOptional, IsEnum, Length, IsPhoneNumber } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// export enum ContactSubject {
//   GENERAL = 'general',
//   PROPERTY_INQUIRY = 'property_inquiry',
//   SELL_PROPERTY = 'sell_property',
//   RENT_PROPERTY = 'rent_property',
//   TECHNICAL_SUPPORT = 'technical_support',
//   OTHER = 'other',
// }

// export class CreateContactDto {
//   @ApiProperty({ example: 'John Doe' })
//   @IsString()
//   @Length(2, 100)
//   name: string;

//   @ApiProperty({ example: 'john.doe@example.com' })
//   @IsEmail()
//   email: string;

//   @ApiPropertyOptional({ example: '+34 600 123 456' })
//   @IsOptional()
//   @IsPhoneNumber('ES')
//   phone?: string;

//   @ApiProperty({ enum: ContactSubject, example: ContactSubject.PROPERTY_INQUIRY })
//   @IsEnum(ContactSubject)
//   subject: ContactSubject;

//   @ApiPropertyOptional({ example: 'prop-123-uuid' })
//   @IsOptional()
//   @IsString()
//   propertyId?: string;

//   @ApiProperty({ example: 'I am interested in this property. Can you provide more details?' })
//   @IsString()
//   @Length(10, 2000)
//   message: string;

//   @ApiPropertyOptional({ example: true })
//   @IsOptional()
//   newsletter?: boolean;
// }

// export class ContactResponseDto {
//   @ApiProperty()
//   id: string;

//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   email: string;

//   @ApiPropertyOptional()
//   phone?: string;

//   @ApiProperty({ enum: ContactSubject })
//   subject: ContactSubject;

//   @ApiPropertyOptional()
//   propertyId?: string;

//   @ApiProperty()
//   message: string;

//   @ApiPropertyOptional()
//   newsletter?: boolean;

//   @ApiProperty()
//   createdAt: Date;

//   @ApiProperty()
//   status: ContactStatus;
// }

// export enum ContactStatus {
//   NEW = 'new',
//   IN_PROGRESS = 'in_progress',
//   RESOLVED = 'resolved',
//   CLOSED = 'closed',
// }
