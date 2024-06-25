import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

describe('CoursesController', () => {
    let controller: CoursesController;

    const mockCoursesService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        preloadTagByName: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CoursesController],
            providers: [CoursesService]
        })
            .overrideProvider(CoursesService)
            .useValue(mockCoursesService)
            .compile();

        controller = module.get<CoursesController>(CoursesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
