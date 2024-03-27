import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserdto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from '../../guards/auth/auth.guard';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    // return { username: 'Anson' };
    return this.userService.fetchUsers();
  }

  @Get('posts/com')
  getUsersPosts() {
    return [
      {
        id: 1,
        title: 'Anson',
      },
    ];
  }

  @Post()
  createUser(@Req() request: Request, @Res() response: Response) {
    response.send('Created');
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUserB(@Body(ValidateCreateUserPipe) userData: CreateUserdto) {
    console.log(userData);
    return this.userService.createUser(userData);
  }

  @Get(':id/:postId')
  getUserById(@Param('id') id: string, @Param('postId') postId: string) {
    console.log(id);
    return { id, postId };
  }

  @Get(':id')
  getUserDetailsById(@Param('id') id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
