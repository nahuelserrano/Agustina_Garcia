// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Contact, ContactStatus } from './entities/contact.entity';
// // import { CreateContactDto, ContactResponseDto, ContactSubject } from './dto/create-contact.dto';

// @Injectable()
// export class ContactService {
//   constructor(
//     @InjectRepository(Contact)
//     private readonly contactRepository: Repository<Contact>,
//   ) {}

//   async create(createContactDto: CreateContactDto): Promise<ContactResponseDto> {
//     const contact = this.contactRepository.create(createContactDto);
//     const savedContact = await this.contactRepository.save(contact);
//     return this.mapToResponseDto(savedContact);
//   }

//   async findAll(status?: ContactStatus, page: number = 1, limit: number = 20) {
//     const queryBuilder = this.contactRepository.createQueryBuilder('contact');

//     if (status) {
//       queryBuilder.andWhere('contact.status = :status', { status });
//     }

//     queryBuilder.orderBy('contact.createdAt', 'DESC');

//     const total = await queryBuilder.getCount();

//     queryBuilder.skip((page - 1) * limit).take(limit);

//     const contacts = await queryBuilder.getMany();

//     return {
//       data: contacts.map(this.mapToResponseDto),
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     };
//   }

//   async findOne(id: string): Promise<ContactResponseDto> {
//     const contact = await this.contactRepository.findOne({ where: { id } });
//     if (!contact) {
//       throw new NotFoundException(`Contact with ID ${id} not found`);
//     }
//     return this.mapToResponseDto(contact);
//   }

//   async updateStatus(id: string, status: ContactStatus): Promise<ContactResponseDto> {
//     const contact = await this.contactRepository.findOne({ where: { id } });
//     if (!contact) {
//       throw new NotFoundException(`Contact with ID ${id} not found`);
//     }

//     contact.status = status;
//     const updatedContact = await this.contactRepository.save(contact);
//     return this.mapToResponseDto(updatedContact);
//   }

//   async getStats() {
//     const total = await this.contactRepository.count();
//     const byStatus = await this.contactRepository
//       .createQueryBuilder('contact')
//       .select('contact.status', 'status')
//       .addSelect('COUNT(*)', 'count')
//       .groupBy('contact.status')
//       .getRawMany();

//     const bySubject = await this.contactRepository
//       .createQueryBuilder('contact')
//       .select('contact.subject', 'subject')
//       .addSelect('COUNT(*)', 'count')
//       .groupBy('contact.subject')
//       .getRawMany();

//     return {
//       total,
//       byStatus,
//       bySubject,
//     };
//   }

//   private mapToResponseDto(contact: Contact): ContactResponseDto {
//     return {
//       id: contact.id,
//       name: contact.name,
//       email: contact.email,
//       phone: contact.phone,
//       subject: contact.subject,
//       propertyId: contact.propertyId,
//       message: contact.message,
//       newsletter: contact.newsletter,
//       createdAt: contact.createdAt,
//       status: contact.status,
//     };
//   }
// }
