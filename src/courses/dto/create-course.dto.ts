import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    tags: string[];
}
