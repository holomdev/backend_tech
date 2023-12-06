import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './iam/authentication/decorators/auth.decorator';
import { AuthType } from './iam/authentication/enums/auth-type.enum';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({
    status: 200,
    description: 'Health Check',
    schema: { type: 'string', example: 'UP!' },
  })
  @Get()
  health_check(): string {
    return this.appService.health_check();
  }
}
