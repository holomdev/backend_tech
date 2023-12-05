import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health_check(): string {
    return 'UP!';
  }
}
