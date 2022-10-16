import { Body, Controller, Get, Param, Post, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('messages')
export class MessagesController {
    constructor(public messagesService: MessagesService) {
    }

    @Get()
    listMessages(){
        return this.messagesService.findAll();
    }

    @UseInterceptors(SerializeInterceptor)
    @Post() 
    createMessage(@Body() body : CreateMessageDto){
        console.log("inside controller");
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string){
        const message = await this.messagesService.findOne(id);
        if(!message){
            throw new NotFoundException('Message not found');
        }
        return message;
    }
}
