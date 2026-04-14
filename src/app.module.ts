import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/users/users.module';
import { DatabaseModule } from '@/database/database.module';
import { EmployeesModule } from '@/employees/employees.module';
import { CustomLoggerModule } from '@/custom-logger/custom-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      // limit to 3 api requests in 1 second
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      // limit to 10 api requests in 60 seconds
      {
        name: 'long',
        ttl: 60000,
        limit: 10,
      },
    ]),
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
