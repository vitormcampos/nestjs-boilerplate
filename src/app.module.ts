import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './courses/courses.module';

@Module({
    imports: [DatabaseModule, SharedModule, CoursesModule],
    controllers: [],
    providers: []
})
export class AppModule {}
