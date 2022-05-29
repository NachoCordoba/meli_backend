import { Module } from "@nestjs/common";
import { MeliCategoryRepository } from "./meli-category.respository";
import { MeliCategoryService } from "./meli-category.service";

@Module({
    imports: [],
    controllers: [],
    providers: [MeliCategoryService, MeliCategoryRepository],
    exports: [MeliCategoryService]
})
export class MeliCategoryModule {}