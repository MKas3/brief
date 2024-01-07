import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  findAll(@Query('skip') skip = '0', @Query('take') take = '3') {
    return this.userService.findAll(+skip, +take);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findOne(@Req() req, @Param('id') id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Patch()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ id: +req.user.id }, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: +id });
  }
}
