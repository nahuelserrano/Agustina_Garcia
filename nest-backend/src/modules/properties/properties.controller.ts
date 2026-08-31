import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import {
  GetPropertiesQueryDto,
  PublicPropertyDto,
  PaginatedPropertiesResponse,
} from './dto/properties.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async findAll(@Query() query: GetPropertiesQueryDto): Promise<PaginatedPropertiesResponse> {
    return this.propertiesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PublicPropertyDto> {
    return this.propertiesService.findOne(id);
  }
}
