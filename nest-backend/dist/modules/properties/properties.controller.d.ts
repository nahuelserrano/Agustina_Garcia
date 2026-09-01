import { PropertiesService } from './properties.service';
import { GetPropertiesQueryDto, PublicPropertyDto, PaginatedPropertiesResponse } from './dto/properties.dto';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(query: GetPropertiesQueryDto): Promise<PaginatedPropertiesResponse>;
    findOne(id: string): Promise<PublicPropertyDto>;
}
