import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import {
  GetPropertiesQueryDto,
  PublicPropertyDto,
  PaginatedPropertiesResponse,
} from './dto/properties.dto';

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);
  private readonly baseUrl: string;
  private readonly slug: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'TANDILPROP_API_URL',
      'https://www.tandilprop.com.ar',
    );
    this.slug = this.configService.get<string>('INMOBILIARIA_SLUG', '');
    this.logger.log('Variables de entorno cargadas', {
      baseUrl: this.baseUrl,
      slug: this.slug,
    });
  }

  async findAll(query: GetPropertiesQueryDto): Promise<PaginatedPropertiesResponse> {
    try {
      const url = `${this.baseUrl}/api/public/inmobiliarias/${this.slug}/properties`;

      const response = await firstValueFrom(
        this.httpService.get<PaginatedPropertiesResponse>(url, {
          params: query,
          headers: { Accept: 'application/json' },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error('Error al consultar listado en TandilProp', error);
      this.handleHttpError(error);
    }
  }

  async findOne(id: string): Promise<PublicPropertyDto> {
    try {
      const url = `${this.baseUrl}/api/public/inmobiliarias/${this.slug}/properties/${id}`;

      const response = await firstValueFrom(
        this.httpService.get<PublicPropertyDto>(url, {
          headers: { Accept: 'application/json' },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error al consultar propiedad ${id} en TandilProp`, error);
      this.handleHttpError(error);
    }
  }

  private handleHttpError(error: unknown): never {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          data?.message || 'Propiedad o inmobiliaria no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      if (status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(data || 'Parámetros de consulta inválidos', HttpStatus.BAD_REQUEST);
      }
    }

    throw new HttpException(
      'Error al comunicarse con la API de TandilProp',
      HttpStatus.BAD_GATEWAY,
    );
  }
}
