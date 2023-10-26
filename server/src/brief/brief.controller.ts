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
import { BriefService } from './brief.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { UserExistenceGuard } from '../guards/user-existence.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BriefAuthorGuard } from '../guards/brief-author.guard';

@Controller('brief')
export class BriefController {
  constructor(private readonly briefService: BriefService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  create(@Req() req, @Body() createBriefDto: CreateBriefDto) {
    return this.briefService.create(+req.user.id, createBriefDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  findAll(
    @Req() req,
    @Query('take') take: string,
    @Query('skip') skip: string,
  ) {
    return this.briefService.findAll(+skip, +take, {
      userId: +req.user.id,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefAuthorGuard)
  findOne(@Param('id') id: string) {
    return this.briefService.findOne({ id: +id });
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefAuthorGuard)
  update(@Param('id') id: string, @Body() updateBriefDto: UpdateBriefDto) {
    return this.briefService.update({ id: +id }, updateBriefDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefAuthorGuard)
  remove(@Param('id') id: string) {
    return this.briefService.remove({ id: +id });
  }
}
