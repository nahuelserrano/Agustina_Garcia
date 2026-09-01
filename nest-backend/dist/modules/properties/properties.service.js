"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PropertiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let PropertiesService = PropertiesService_1 = class PropertiesService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(PropertiesService_1.name);
        this.baseUrl = this.configService.get('TANDILPROP_API_URL', 'https://www.tandilprop.com.ar');
        this.slug = this.configService.get('INMOBILIARIA_SLUG', '');
        this.logger.log('Variables de entorno cargadas', {
            baseUrl: this.baseUrl,
            slug: this.slug,
        });
    }
    async findAll(query) {
        try {
            const url = `${this.baseUrl}/api/public/inmobiliarias/${this.slug}/properties`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                params: query,
                headers: { Accept: 'application/json' },
            }));
            return response.data;
        }
        catch (error) {
            this.logger.error('Error al consultar listado en TandilProp', error);
            this.handleHttpError(error);
        }
    }
    async findOne(id) {
        try {
            const url = `${this.baseUrl}/api/public/inmobiliarias/${this.slug}/properties/${id}`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: { Accept: 'application/json' },
            }));
            return response.data;
        }
        catch (error) {
            this.logger.error(`Error al consultar propiedad ${id} en TandilProp`, error);
            this.handleHttpError(error);
        }
    }
    handleHttpError(error) {
        if (error instanceof axios_2.AxiosError && error.response) {
            const status = error.response.status;
            const data = error.response.data;
            if (status === common_1.HttpStatus.NOT_FOUND) {
                throw new common_1.HttpException(data?.message || 'Propiedad o inmobiliaria no encontrada', common_1.HttpStatus.NOT_FOUND);
            }
            if (status === common_1.HttpStatus.BAD_REQUEST) {
                throw new common_1.HttpException(data || 'Parámetros de consulta inválidos', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        throw new common_1.HttpException('Error al comunicarse con la API de TandilProp', common_1.HttpStatus.BAD_GATEWAY);
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = PropertiesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map