import { PhotoDto } from "common/dto/index.dto";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Photo implements PhotoDto.CreatePhotoDto {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @Column({ nullable: false })
    type: PhotoDto.PHOTO_TYPE;

    @Column({ nullable: false })
    mimetype: string;

    @Column({ nullable: false })
    url: string;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    filename: string;

    @Column({ nullable: false })
    size: number;
}