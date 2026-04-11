import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { UsersService } from '@/users/users.service';

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
      findOne(@Param('id') id: string) {
        return { id };
      }

   * the order matters in this case
   *
   */

  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    // unary plus -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    const removedUser = this.usersService.delete(+id);

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
