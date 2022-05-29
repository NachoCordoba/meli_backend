import { Module } from "@nestjs/common";
import { ItemController } from "./item.controller";
import { ItemRepository } from "./item.respository";
import { ItemService } from "./item.service";

@Module({
    imports: [],
    controllers: [ItemController],
    providers: [ItemService, ItemRepository],
})
export class ItemModule {}