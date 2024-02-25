import { Injectable } from '@nestjs/common';
import { SendNotification } from './dto/notification.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class NotificationService {
  constructor(private userService: UserService) {}

  async sendEmail(dto: SendNotification) {
    const { email } = await this.userService.findUserByConsumerId(
      dto.consumerId,
    );

    // We'll use above consumer email to to send notifications i.e. twilio or nodemailer etc.
    return { status: 'Booking Notification sent!' };
  }
}
