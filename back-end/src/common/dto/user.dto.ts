import { ApiProperty } from '@nestjs/swagger';
import { USER_TYPE } from 'common/interfaces/index.interface';
import { IsDefined, IsEnum, IsString } from 'class-validator';
// 管理员DTO
export namespace UserDto {
  // 创建普通用户或管理员
  export class CreateUserDto {
    @IsDefined()
    @IsString()
    @ApiProperty({ description: '邮箱' })
    readonly email: string;

    @IsDefined()
    @IsString()
    @ApiProperty({ description: '用户昵称' })
    readonly username: string;

    @IsDefined()
    @IsEnum(USER_TYPE)
    @ApiProperty({
      description: '用户类型',
      enum: [USER_TYPE.NORMAL, USER_TYPE.ADMIN],
    })
    readonly type: USER_TYPE;

    @IsString()
    readonly webUrl: string;

    @ApiProperty({ description: '登录密码' })
    password: string;
  }
}
