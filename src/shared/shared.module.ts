import { Module } from '@nestjs/common';
import { GenericRepository } from './repositories/generic.repository';

@Module({
    providers: [GenericRepository],
    exports: [GenericRepository]
})
export class SharedModule {}
