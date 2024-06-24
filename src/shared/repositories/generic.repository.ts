import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget, FindOneOptions } from 'typeorm';

@Injectable({})
export class GenericRepository<T> {
    constructor(
        @InjectDataSource()
        protected readonly dataSource: DataSource
    ) {}

    async _find(entity: EntityTarget<T>): Promise<T[]> {
        return await this.dataSource.getRepository(entity).find();
    }

    async _findOne(entity: EntityTarget<T>, id: string): Promise<T> {
        const findOptions: FindOneOptions<any> = {
            where: { id }
        };
        return await this.dataSource.getRepository(entity).findOne(findOptions);
    }

    async _create(entity: EntityTarget<T>, data: T): Promise<T> {
        return await this.dataSource.getRepository(entity).save(data);
    }

    async _update(entity: EntityTarget<T>, data: T, id: string): Promise<T> {
        await this.dataSource.getRepository(entity).save({ ...data, id });

        return await this._findOne(entity, id);
    }

    async _delete(entity: EntityTarget<T>, id: string): Promise<T> {
        await this.dataSource.getRepository(entity).delete(id);

        return await this._findOne(entity, id);
    }
}
