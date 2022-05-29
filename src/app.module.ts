import { Module } from '@nestjs/common';
import { ItemModule } from './modules/Item/item.module';

@Module({
  imports: [ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
