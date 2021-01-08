import { PhotoDto } from "common/dto/index.dto";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @Column({ comment: '图片类型' })
    type: PhotoDto.PHOTO_TYPE;

    @Column({ nullable: false, comment: '媒体类型' })
    mimetype: string;

    @Column({ nullable: false, comment: '图片所在的文件目录' })
    destination: string;

    @Column({ nullable: false, comment: '图片完整路径地址' })
    path: string;

    @Column({ nullable: false, comment: '被修改后的图片名, 避免重复' })
    filename: string;

    @Column({ nullable: false, comment: '图片原始名' })
    originalname: string;

    @Column({ nullable: false, comment: '图片大小' })
    size: number;
}