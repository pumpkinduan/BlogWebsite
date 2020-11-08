import { Body, Controller, Delete, Get, Param, Post, Inject, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentDto } from "common/dto/index.dto";
import { CommentInterface, ResultInterface, SuccessMessage } from "common/interfaces/index.interface";
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
    async getComments(@Query('page') page = 1, @Query('pageSize') pageSize = 10): Promise<ResultInterface> {
        const comments = await this.commentRepository.findAndCount(page, pageSize)
        return {
            success: true,
            message: SuccessMessage.Comment.LISTS,
            statusCode: HttpStatus.OK,
            data: comments
        };
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
    async deleteComment(@Param('id') id: string): Promise<ResultInterface> {
        await this.commentRepository.deleteOneById(id);
        return {
            success: true,
            message: SuccessMessage.Comment.DELETE,
            statusCode: HttpStatus.OK,
        };
    }
}
