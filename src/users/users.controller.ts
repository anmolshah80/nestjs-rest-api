import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UserRole } from '@/common/enums/user-roles.enum';

@Controller('users')
export class UsersController {
  /**
   * users controller can be used to handle all these routes
   *
   * GET /users
   * GET /users/:id
   * POST /users
   * PATCH /users/:id
   * DELETE /users/:id
   *
   * NOTE: The order of routes does matter here
   * 
   * Consider these routes:
   * 
   * @Get('interns') // GET /users/interns
      findAllInterns() {
        return [];
      }

   * @Get(':id') // GET /users/:id
      findOne(@Param('id', ParseIntPipe) id: number) {
        return { id };
      }

   * the order matters in this case
   *
   */

  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: UserRole) {
    return this.usersService.findAll(role);
  }

  // ParseIntPipe transforms the `id` param into number
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // unary plus -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    const removedUser = this.usersService.delete(id);

    if (!removedUser)
      return {
        status: 'failed',
        message: 'An error occurred while deleting the  user with ID: ${id}.',
      };

    return {
      status: 'success',
      message: 'The user with ID: ${id} has been deleted successfully!',
      user: removedUser,
    };
  }
}
