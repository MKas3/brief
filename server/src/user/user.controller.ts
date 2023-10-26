import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { $Enums } from '@prisma/client';
import { UserAuthorGuard } from '../guards/user-author.guard';
import { UserExistenceGuard } from '../guards/user-existence.guard';
import { CreateUserGoogleDto } from './dto/create-user-google.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('google')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createByGoogle(@Body() createUserDto: CreateUserGoogleDto) {
    return this.userService.createByGoogle(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findOne(@Req() req, @Param('id') id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard, UserAuthorGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ id: +id }, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, UserAuthorGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: +id });
  }
}
