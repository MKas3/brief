import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBriefImageDto } from '../brief-image/dto/create-brief-image.dto';
import { BriefImageService } from '../brief-image/brief-image.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class BriefService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly briefImageService: BriefImageService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(userId: number, createBriefDto: CreateBriefDto) {
    return this.prisma.brief.create({
      data: {
        userId,
        ...createBriefDto,
      },
    });
  }

  findAll(
    skip?: number,
    take?: number,
    where?: Prisma.BriefWhereInput,
    cursor?: Prisma.BriefWhereUniqueInput,
    orderBy?: Prisma.BriefOrderByWithRelationInput,
  ) {
    return this.prisma.brief.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy,
      include: {
        images: true,
        selectedImages: true,
      },
    });
  }

  async findOne(where: Prisma.BriefWhereInput) {
    const candidate = await this.prisma.brief.findFirst({
      where,
      include: {
        images: true,
        selectedImages: true,
      },
    });
    if (!candidate) throw new BadRequestException();
    return candidate;
  }

  async update(where: Prisma.BriefWhereUniqueInput, data: UpdateBriefDto) {
    const { clientEmail, clientName, ...updateData } = data;

    const candidate = await this.findOne(where);

    let clientInfo = null;

    if (!candidate.clientName)
      clientInfo = {
        clientEmail,
        clientName,
      };

    let doneDate: Date = undefined;
    if (data.progress && data.progress === 'DONE')
      doneDate = new Date(Date.now());

    if (data.incorrect && data.incorrect.some((el) => el))
      updateData.completed = false;
    else if (data.incorrect) {
      updateData.completed = true;
      updateData.incorrectMessage = null;
    }

    return this.prisma.brief.update({
      data: {
        ...updateData,
        ...clientInfo,
        doneDate,
      },
      where,
    });
  }

  async updateImages(
    where: Prisma.BriefWhereUniqueInput,
    data: CreateBriefImageDto[],
  ) {
    const paths = data.map((el) => el.path);
    const images = await this.briefImageService.findAllByWhere({
      path: {
        in: paths,
      },
    });
    return this.prisma.brief.update({
      data: {
        selectedImages: {
          set: images,
        },
      },
      where,
    });
  }

  remove(where: Prisma.BriefWhereUniqueInput) {
    return this.prisma.brief.delete({
      where,
    });
  }

  async generateLink(id: number) {
    const emptyBriefsCount = await this.prisma.brief.count({
      where: {
        userId: id,
        lastAction: null,
      },
    });

    if (emptyBriefsCount >= 3) throw new BadRequestException('Max empty links');

    const brief = await this.create(id, { title: '' });

    return { link: this.cryptoService.encryptLink(brief.id.toString()) };
  }

  async findLink(briefId: number) {
    return { link: this.cryptoService.encryptLink(briefId.toString()) };
  }

  checkLink(encrypted: string) {
    try {
      return { data: this.cryptoService.decryptLink(encrypted) };
    } catch (e) {
      throw e;
    }
  }

  async findLastLink(userId: number) {
    const lastEmptyBrief = await this.prisma.brief.findFirst({
      where: {
        userId,
        lastAction: null,
      },
      orderBy: {
        id: 'desc',
      },
    });

    if (!lastEmptyBrief)
      throw new BadRequestException('Empty briefs does not exist');

    return {
      link: this.cryptoService.encryptLink(lastEmptyBrief.id.toString()),
    };
  }

  findAllClients(where: Prisma.BriefWhereInput) {
    return this.prisma.brief.findMany({
      where,
      select: {
        clientEmail: true,
        clientName: true,
        title: true,
      },
    });
  }
}
