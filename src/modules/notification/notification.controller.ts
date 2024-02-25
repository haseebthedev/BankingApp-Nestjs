import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotification } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private notifService: NotificationService) {}

  @Post('/send')
  async sendEmail(@Body() dto: SendNotification) {
    console.log('dto === ', dto);
    return await this.notifService.sendEmail(dto);
  }
}
