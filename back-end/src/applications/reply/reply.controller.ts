import { Controller, Inject, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReplyDto } from 'common/dto/reply.dto';
import { ResultInterface } from 'common/interfaces/index.interface';
import { ReplyService } from './reply.service';

@Controller('reply')
@ApiTags('回复')
export class ReplyController {
    constructor(
        @Inject(ReplyService) readonly replyService: ReplyService,
    ) { }

    @ApiOperation({ description: '创建回复' })
    @Post('/create')
    async createReply(@Body() createReplyDto: ReplyDto.CreateReplyDto): Promise<ResultInterface> {
        const reply = await this.replyService.create(createReplyDto);
        return {
            statusCode: 200,
            success: true,
            data: reply
        }
    }

    @ApiOperation({ description: '删除回复' })
    @Delete('/:id')
    async deleteReply(@Param('id') id: number): Promise<ResultInterface> {
        const reply = await this.replyService.deleteOneById(id);
        return {
            statusCode: 200,
            success: true,
            data: reply
        }
    }
}
