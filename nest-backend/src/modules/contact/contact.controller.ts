// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Query,
//   ParseUUIDPipe,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
// import { ContactService } from './contact.service';
// import { CreateContactDto, ContactResponseDto, ContactSubject, ContactStatus } from './dto/create-contact.dto';

// @ApiTags('Contact')
// @Controller('contact')
// export class ContactController {
//   constructor(private readonly contactService: ContactService) {}

//   @Post()
//   @ApiOperation({ summary: 'Submit a contact form' })
//   @ApiResponse({ status: 201, description: 'Contact submitted successfully', type: ContactResponseDto })
//   @ApiResponse({ status: 400, description: 'Bad request - validation error' })
//   async create(@Body() createContactDto: CreateContactDto): Promise<ContactResponseDto> {
//     return this.contactService.create(createContactDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all contacts (admin)' })
//   @ApiQuery({ name: 'status', required: false, enum: ContactStatus })
//   @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
//   @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
//   @ApiResponse({ status: 200, description: 'List of contacts' })
//   async findAll(
//     @Query('status') status?: ContactStatus,
//     @Query('page') page?: number,
//     @Query('limit') limit?: number,
//   ) {
//     return this.contactService.findAll(status, page, limit);
//   }

//   @Get('stats')
//   @ApiOperation({ summary: 'Get contact statistics (admin)' })
//   @ApiResponse({ status: 200, description: 'Contact statistics' })
//   async getStats() {
//     return this.contactService.getStats();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a contact by ID (admin)' })
//   @ApiParam({ name: 'id', format: 'uuid' })
//   @ApiResponse({ status: 200, description: 'Contact found', type: ContactResponseDto })
//   @ApiResponse({ status: 404, description: 'Contact not found' })
//   async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ContactResponseDto> {
//     return this.contactService.findOne(id);
//   }

//   @Patch(':id/status')
//   @ApiOperation({ summary: 'Update contact status (admin)' })
//   @ApiParam({ name: 'id', format: 'uuid' })
//   @ApiResponse({ status: 200, description: 'Contact status updated', type: ContactResponseDto })
//   @ApiResponse({ status: 404, description: 'Contact not found' })
//   async updateStatus(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body('status') status: ContactStatus,
//   ): Promise<ContactResponseDto> {
//     return this.contactService.updateStatus(id, status);
//   }
// }
