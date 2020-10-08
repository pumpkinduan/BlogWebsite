import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentDto } from "dto/index.dto";
import { CommentInterface } from "interfaces/index.interface";
import { exampleInstance } from "example";
@Controller('comments')
@ApiTags('留言')
export class CommentController {
    @ApiOperation({ description: '获取留言列表' })
    @Get()
    getComments(): CommentInterface.BasicComment[] {
        return [exampleInstance.commentListItem];
    }

    @ApiOperation({ description: '创建留言' })
    @Post('/create')
    createComment(@Body() createCommentDto: CommentDto.CreateCommentDto) {
        return createCommentDto;
    }

    @ApiOperation({ description: '删除留言' })
    @Delete(':id')
    deleteComment(@Param('id') id: string) {
        return {
            success: true
        };
    }
}
