import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '@/common/enums/user-roles.enum';

// Enum Validation -> https://stackoverflow.com/questions/62306451/nestjs-isenum-dto-validation-and-swagger
export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    type: 'string',
    description: 'Email address of the user',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: ['INTERN', 'ENGINEER', 'ADMIN'],
  })
  @IsEnum(UserRole, {
    message: 'Role must be either INTERN, ENGINEER, or ADMIN',
  })
  role!: UserRole;
}
