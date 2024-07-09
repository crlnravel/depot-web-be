import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<ProductEntity[]> {
    return this.prisma.product.findMany();
  }

  findById(id: number): Promise<ProductEntity> {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        stock: updateProductDto.stock,
        kualitasAir: updateProductDto.kualitasAir,
      },
    });
  }

  updateRating(id: number, rating: number): Promise<ProductEntity> {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        totalRating: {
          increment: rating,
        },
        totalPurchases: {
          increment: 1,
        },
      },
    });
  }
}
