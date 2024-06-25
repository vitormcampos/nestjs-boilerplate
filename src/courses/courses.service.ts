import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './repositories/courses.repository';
import { Course } from './entities/course.entity';
import { TagsRepository } from './repositories/tags.repository';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        private readonly coursesRepository: CoursesRepository,
        private readonly tagsRepository: TagsRepository
    ) {}

    async findAll() {
        return await this.coursesRepository.find();
    }

    async findOne(id: string) {
        return await this.coursesRepository.findOne(id);
    }

    async create(createCourseDto: CreateCourseDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map(async (tag) => {
                return await this.preloadTagByName(tag);
            })
        );
        return await this.coursesRepository.create({
            ...createCourseDto,
            tags
        } as Course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const tags =
            updateCourseDto.tags &&
            (await Promise.all(
                updateCourseDto.tags.map(async (tag) => {
                    return await this.preloadTagByName(tag);
                })
            ));
        return await this.coursesRepository.update(
            { ...updateCourseDto, tags } as Course,
            id
        );
    }

    async remove(id: string) {
        return await this.coursesRepository.delete(id);
    }

    async preloadTagByName(name: string) {
        const tag = await this.tagsRepository.findByName(name);
        if (tag) {
            return tag;
        }

        return await this.tagsRepository.create({ name } as Tag);
    }
}
