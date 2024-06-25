import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './repositories/courses.repository';
import { TagsRepository } from './repositories/tags.repository';
import { randomUUID } from 'node:crypto';

describe('CoursesService', () => {
    let service: CoursesService;

    const tag = {
        id: randomUUID(),
        name: 'test'
    };

    const course = {
        id: randomUUID(),
        name: 'test',
        description: 'test'
    };

    const mockCoursesRepository = {
        create: jest.fn().mockResolvedValue(Promise.resolve(course)),
        find: jest.fn().mockResolvedValue(Promise.resolve([course])),
        findOne: jest.fn().mockReturnValue(Promise.resolve(course)),
        update: jest.fn().mockReturnValue(Promise.resolve(course)),
        delete: jest.fn().mockReturnValue(Promise.resolve(course))
    };

    const mockTagsRepository = {
        findByName: jest.fn().mockReturnValue(Promise.resolve(tag)),
        create: jest.fn().mockReturnValue(Promise.resolve(tag))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CoursesService, CoursesRepository, TagsRepository]
        })
            .overrideProvider(CoursesRepository)
            .useValue(mockCoursesRepository)
            .overrideProvider(TagsRepository)
            .useValue(mockTagsRepository)
            .compile();

        service = module.get<CoursesService>(CoursesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return the created course', async () => {
        const createCourseDto = {
            name: 'test',
            description: 'test',
            tags: ['test']
        };
        const newCourse = await service.create(createCourseDto);

        expect(mockCoursesRepository.create).toHaveBeenCalled();
        expect(newCourse).toStrictEqual(course);
    });

    it('should return all courses', async () => {
        const courses = await service.findAll();

        expect(mockCoursesRepository.find).toHaveBeenCalled();
        expect(courses).toStrictEqual([course]);
    });

    it('should return the finded course', async () => {
        const finded = await service.findOne(course.id);

        expect(mockCoursesRepository.findOne).toHaveBeenCalled();
        expect(finded).toStrictEqual(course);
    });

    it('should return the updated course', async () => {
        const updateCourseDto = {
            name: 'test',
            description: 'test',
            tags: ['test']
        };
        const updatedCourse = await service.update(course.id, updateCourseDto);

        expect(mockCoursesRepository.update).toHaveBeenCalled();
        expect(updatedCourse).toStrictEqual(course);
    });

    it('should return the deleted course', async () => {
        const deletedCourse = await service.remove(course.id);

        expect(mockCoursesRepository.delete).toHaveBeenCalled();
        expect(deletedCourse).toStrictEqual(course);
    });
});
