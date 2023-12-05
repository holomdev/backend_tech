import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  controllers: [AuthenticationController],
})
export class IamModule {}
