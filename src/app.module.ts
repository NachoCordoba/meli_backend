import { Module } from '@nestjs/common';
import { ItemModule } from './modules/Item/item.module';
import { MeliCategoryModule } from './modules/MeliCategory/meli-category.module';
import { MeliItemModule } from './modules/MeliItem/meli-item.module';

@Module({
  imports: [MeliItemModule, MeliCategoryModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
