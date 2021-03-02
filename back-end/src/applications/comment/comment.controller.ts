import { Body, Controller, Delete, Get, Param, Post, Inject, HttpStatus, Request, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CommentDto, COMMENT_TYPE } from "common/dto/index.dto";
import { ResultInterface, SuccessMessage } from "common/interfaces/index.interface";
import { CommentService } from './comment.service'
import { JwtAuthGuard } from 'src/guards/index.guard'

@Controller('comments')
@ApiTags('留言')
export class CommentController {
    constructor(
        @Inject(CommentService) readonly commentService: CommentService,
    ) { }
    @ApiOperation({ description: '获取留言列表' })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'pageSize', example: 10 })
    @ApiQuery({ name: 'type', example: COMMENT_TYPE.ALL, enum: COMMENT_TYPE })
    @Get()
    async getComments(@Query('page') page = 1, @Query('pageSize') pageSize = 10, @Query('type') type = COMMENT_TYPE.ALL): Promise<ResultInterface> {
        const comments = await this.commentService.findAndCount(page, pageSize, type)
        return {
            success: true,
            message: SuccessMessage.Comment.LISTS,
            statusCode: HttpStatus.OK,
            data: comments[0],
            sum: comments[1]
        };
    }

    @ApiOperation({ description: '创建留言' })
    @ApiBearerAuth()
    @UseGuards(new JwtAuthGuard())
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

    @ApiOperation({ description: '批量删除留言' })
    @ApiParam({ name: 'ids', example: '1,2,3,4' })
    @ApiBearerAuth()
    @UseGuards(new JwtAuthGuard())
    @Delete(':ids')
    async deleteComments(@Param('ids') ids: string): Promise<ResultInterface> {
        await this.commentService.deleteByIds(ids.split(','));
        return {
            success: true,
            message: SuccessMessage.Comment.DELETE,
            statusCode: HttpStatus.OK,
        };
    }
}
