import { Module } from "@nestjs/common";
import { MeliItemRepository } from "./meli-item.repository";
import { MeliItemService } from "./meli-item.service";

@Module({
    imports: [],
    controllers: [],
    providers: [MeliItemService, MeliItemRepository],
    exports: [MeliItemService]
})
export class MeliItemModule {}