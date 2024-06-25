import { Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { GenericRepository } from '../../shared/repositories/generic.repository';

@Injectable({})
export class CoursesRepository extends GenericRepository<Course> {
    async find() {
        return await this.dataSource
            .getRepository(Course)
            .find({ relations: { tags: true } });
    }

    async findOne(id: string) {
        return await this.dataSource
            .getRepository(Course)
            .find({ relations: { tags: true }, where: { id } });
    }

    async create(course: Course) {
        return await super._create(Course, course);
    }

    async update(course: Course, id: string) {
        return await super._update(Course, course, id);
    }

    async delete(id: string) {
        return await super._delete(Course, id);
    }
}
