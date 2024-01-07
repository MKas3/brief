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
import { UpdateBriefDto } from './dto/update-brief.dto';
import { UserExistenceGuard } from '../guards/user-existence.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BriefAuthorGuard } from '../guards/brief-author.guard';
import { CreateBriefImageDto } from '../brief-image/dto/create-brief-image.dto';
import { BriefLinkGuard } from './guards/brief-link.guard';
import { RoleGuard } from '../guards/role.guard';
import { $Enums } from '@prisma/client';

@Controller('brief')
export class BriefController {
  constructor(private readonly briefService: BriefService) {}

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

  @Get('user/:id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findAllByUser(
    @Query('take') take: string = '0',
    @Query('skip') skip: string = '3',
    @Param('id') userId: string = '-1',
  ) {
    return this.briefService.findAll(+skip, +take, {
      userId: +userId,
    });
  }

  @Get('link')
  @UseGuards(BriefLinkGuard)
  findOneByLink(@Req() req) {
    return this.briefService.findOne({ id: +req.linkData.id });
  }

  @Get('link/last')
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  findLastLink(@Req() req) {
    return this.briefService.findLastLink(+req.user.id);
  }

  @Get('link/:id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefAuthorGuard)
  findLink(@Param('id') id: string) {
    return this.briefService.findLink(+id);
  }

  @Get('clients')
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  findClientsByBrief(@Req() req) {
    return this.briefService.findAllClients({
      userId: +req.user.id,
      clientName: { not: null },
      clientEmail: { not: null },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, BriefAuthorGuard)
  findOne(@Param('id') id: string) {
    return this.briefService.findOne({ id: +id });
  }

  @Patch('images')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(BriefLinkGuard)
  updateImages(@Req() req, @Body() updateBriefDto: CreateBriefImageDto[]) {
    return this.briefService.updateImages(
      { id: +req.linkData.id },
      updateBriefDto,
    );
  }

  @Patch('link')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(BriefLinkGuard)
  updateFromLink(@Req() req, @Body() updateBriefDto: UpdateBriefDto) {
    return this.briefService.update({ id: +req.linkData.id }, updateBriefDto);
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

  @Delete('admin/:id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  removeAdmin(@Param('id') id: string) {
    return this.briefService.remove({ id: +id });
  }

  @Post('checkLink')
  @UseGuards(BriefLinkGuard)
  checkLink(@Req() req) {
    return { briefId: +req.linkData.id };
  }

  @Post('generateLink')
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  generateLink(@Req() req) {
    return this.briefService.generateLink(+req.user.id);
  }
}
