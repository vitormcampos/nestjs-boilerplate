import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    courses: Course[];
}
