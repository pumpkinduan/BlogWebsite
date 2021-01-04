import { Body, Controller, Delete, Get, Param, Post, Inject, HttpStatus, Request, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CommentDto } from "common/dto/index.dto";
import { ResultInterface, SuccessMessage } from "common/interfaces/index.interface";
import { CommentService } from './comment.service'
import { AuthGuard } from '@nestjs/passport';
@Controller('comments')
@ApiTags('留言')
export class CommentController {
    constructor(
        @Inject(CommentService) readonly commentRepository: CommentService,
    ) { }
    @ApiOperation({ description: '获取留言列表' })
    @ApiQuery({ name: 'page', })
    @ApiQuery({ name: 'pageSize' })
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createComment(@Body() createCommentDto: CommentDto.CreateCommentDto, @Request() req): Promise<ResultInterface> {
        console.log(req.user);
        const comment = await this.commentRepository.create(createCommentDto, req.user.id)
        return {
            success: true,
            data: comment,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.Comment.CREATE,
        };
    }

    @ApiOperation({ description: '删除留言' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
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
