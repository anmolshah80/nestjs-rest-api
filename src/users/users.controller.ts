import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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

  @Get() // GET /users
  findAll() {
    return [];
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() // POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // DELETE /users/:id
  deleteUser(@Param('id') id: string) {
    return `The user with id: ${id} has been deleted successfully!`;
  }
}
