import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './repositories/courses.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
    controllers: [CoursesController],
    providers: [CoursesService, CoursesRepository],
    imports: [SharedModule]
})
export class CoursesModule {}
