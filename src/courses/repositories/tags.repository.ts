import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../../shared/repositories/generic.repository';
import { Tag } from '../entities/tag.entity';
import { In } from 'typeorm';

@Injectable({})
export class TagsRepository extends GenericRepository<Tag> {
    async find() {
        return await super._find(Tag);
    }

    async findOne(id: string) {
        return await super._findOne(Tag, id);
    }

    async create(course: Tag) {
        return await super._create(Tag, course);
    }

    async update(course: Tag, id: string) {
        return await super._update(Tag, course, id);
    }

    async delete(id: string) {
        return await super._delete(Tag, id);
    }

    async findByNames(names: string[]) {
        return await super.dataSource
            .getRepository(Tag)
            .findBy({ name: In(names) });
    }

    async findByName(name: string) {
        return await this.dataSource.getRepository(Tag).findOneBy({ name });
    }
}
