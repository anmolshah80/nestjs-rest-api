import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '../../prisma/generated/prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

import { EmployeesService } from '@/employees/employees.service';
import { UserRole } from '@/common/enums/user-roles.enum';

// skip throttling the apis in this controller
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  // apply throttling (rate limit) the get request
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Query('role') role?: UserRole) {
    return this.employeesService.findAll(role);
  }

  // named rate limiting overriden from app.module.ts
  @Throttle({ short: { ttl: 1000, limit: 2 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Throttle({ default: { ttl: 1000, limit: 1 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
