import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCourseDto {
    @IsOptional()
    @IsUUID('4')
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    tags: string[];
}
