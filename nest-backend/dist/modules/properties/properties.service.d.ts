import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GetPropertiesQueryDto, PublicPropertyDto, PaginatedPropertiesResponse } from './dto/properties.dto';
export declare class PropertiesService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    private readonly slug;
    constructor(httpService: HttpService, configService: ConfigService);
    findAll(query: GetPropertiesQueryDto): Promise<PaginatedPropertiesResponse>;
    findOne(id: string): Promise<PublicPropertyDto>;
    private handleHttpError;
}
