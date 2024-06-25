import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './repositories/courses.repository';
import { SharedModule } from '../shared/shared.module';
import { TagsRepository } from './repositories/tags.repository';

@Module({
    controllers: [CoursesController],
    providers: [CoursesService, CoursesRepository, TagsRepository],
    imports: [SharedModule]
})
export class CoursesModule {}
