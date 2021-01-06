import { Body, Controller, Delete, Get, Param, Post, Inject, HttpStatus, Request, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CommentDto } from "common/dto/index.dto";
import { ResultInterface, SuccessMessage } from "common/interfaces/index.interface";
import { CommentService } from './comment.service'
import { AuthGuard } from '@nestjs/passport';
@Controller('comments')
@ApiTags('留言')
export class CommentController {
    constructor(
        @Inject(CommentService) readonly commentService: CommentService,
    ) { }
    @ApiOperation({ description: '获取留言列表' })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'pageSize', example: 10 })
    @Get()
    async getComments(@Query('page') page = 1, @Query('pageSize') pageSize = 10): Promise<ResultInterface> {
        const comments = await this.commentService.findAndCount(page, pageSize)
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
        const comment = await this.commentService.create({ ...createCommentDto, sourceUserId: req.user.id })
        return {
            success: true,
            data: comment,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.Comment.CREATE,
        };
    }

    @ApiOperation({ description: '删除留言' })
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteComment(@Param('id', new ParseIntPipe()) id: number): Promise<ResultInterface> {
        await this.commentService.deleteOneById(id);
        return {
            success: true,
            message: SuccessMessage.Comment.DELETE,
            statusCode: HttpStatus.OK,
        };
    }
}
