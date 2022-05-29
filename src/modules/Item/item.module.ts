import { Module } from "@nestjs/common";
import { MeliCategoryModule } from "../MeliCategory/meli-category.module";
import { MeliItemModule } from "../MeliItem/meli-item.module";
import { ItemController } from "./item.controller";
import { ItemRepository } from "./item.respository";
import { ItemService } from "./item.service";

@Module({
    imports: [MeliItemModule, MeliCategoryModule],
    controllers: [ItemController],
    providers: [ItemService, ItemRepository],
    exports: [ItemService]
})
export class ItemModule {}