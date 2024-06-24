import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './repositories/courses.repository';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(private readonly coursesRepository: CoursesRepository) {}

    async findAll() {
        return await this.coursesRepository.find();
    }

    async findOne(id: string) {
        return await this.coursesRepository.findOne(id);
    }

    async create(createCourseDto: CreateCourseDto) {
        return await this.coursesRepository.create({
            ...createCourseDto
        } as Course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        return await this.coursesRepository.update(
            { ...updateCourseDto } as Course,
            id
        );
    }

    async remove(id: string) {
        return await this.coursesRepository.delete(id);
    }
}
