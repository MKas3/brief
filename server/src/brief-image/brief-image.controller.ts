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
import { BriefImageService } from './brief-image.service';
import { CreateBriefImageDto } from './dto/create-brief-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserExistenceGuard } from '../guards/user-existence.guard';
import { RoleGuard } from '../guards/role.guard';
import { $Enums } from '@prisma/client';
import { BriefImageAuthorGuard } from '../guards/brief-image-author.guard';
import { UpdateBriefImageDto } from './dto/update-brief-image.dto';
import { BriefAuthorGuard } from '../guards/brief-author.guard';

@Controller('brief-image')
export class BriefImageController {
  constructor(private readonly briefImageService: BriefImageService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  create(
    @Req() req,
    @Param('id') id: string,
    @Body() createBriefImageDto: CreateBriefImageDto,
  ) {
    return this.briefImageService.create(
      +req.user.id,
      +id,
      createBriefImageDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findAll() {
    return this.briefImageService.findAll();
  }

  @Get('brief/:id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefAuthorGuard)
  findAllByBrief(@Param('id') id: string) {
    return this.briefImageService.findAllByBrief(+id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findOne(@Param('id') id: string) {
    return this.briefImageService.findOne({ id: +id });
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefImageAuthorGuard)
  update(
    @Param('id') id: string,
    @Body() updateBriefImageDto: UpdateBriefImageDto,
  ) {
    return this.briefImageService.update({ id: +id }, updateBriefImageDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefImageAuthorGuard)
  remove(@Param('id') id: string) {
    return this.briefImageService.remove({ id: +id });
  }
}
