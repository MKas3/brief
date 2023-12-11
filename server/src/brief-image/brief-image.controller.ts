import {
  Body,
  Controller,
  Get,
  Param,
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
import { BriefLinkGuard } from '../brief/guards/brief-link.guard';

@Controller('brief-image')
export class BriefImageController {
  constructor(private readonly briefImageService: BriefImageService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(BriefLinkGuard)
  create(@Req() req, @Body() createBriefImageDto: CreateBriefImageDto) {
    return this.briefImageService.create(+req.linkData.id, createBriefImageDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findAll() {
    return this.briefImageService.findAll();
  }

  @Get('brief')
  @UseGuards(BriefLinkGuard)
  findAllByBrief(@Req() req) {
    return this.briefImageService.findAllByBrief({ id: +req.linkData.id });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findOne(@Param('id') id: string) {
    return this.briefImageService.findOne({ id: +id });
  }
}
