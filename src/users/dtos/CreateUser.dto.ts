import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserdto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
