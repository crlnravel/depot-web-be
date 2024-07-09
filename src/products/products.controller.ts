import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Roles } from '../auth/decorators/role.decorator';
import { $Enums } from '@prisma/client';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/update')
  @Roles($Enums.Role.ADMIN)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/rate')
  updateRating(@Param('id') id: string, @Body('rating') update: number) {
    return this.productsService.updateRating(+id, update);
  }
}
