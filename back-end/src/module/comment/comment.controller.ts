import { Body, Controller, Delete, Get, Param, Post, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentDto } from "common/dto/index.dto";
import { CommentInterface } from "common/interfaces/index.interface";
import { exampleInstance } from "common/example";
import { CommentService } from './comment.service'
@Controller('comments')
@ApiTags('留言')
export class CommentController {
    constructor(
        @Inject(CommentService) readonly commentRepository: CommentService,
    ) { }
    @ApiOperation({ description: '获取留言列表' })
    @Get()
    getComments(): CommentInterface.BasicComment[] {
        return [exampleInstance.commentListItem];
    }

    @ApiOperation({ description: '创建留言' })
    @Post('/create')
    async createComment(@Body() createCommentDto: CommentDto.CreateCommentDto) {
        const comment = await this.commentRepository.create(createCommentDto)
        return {
            data: comment
        };
    }

    @ApiOperation({ description: '删除留言' })
    @Delete(':id')
    deleteComment(@Param('id') id: string) {
        return {
            success: true
        };
    }
}
