import { Module } from '@nestjs/common';

import { EmployeesService } from '@/employees/employees.service';
import { EmployeesController } from '@/employees/employees.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
