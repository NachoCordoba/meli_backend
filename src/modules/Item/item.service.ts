import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Author } from "src/constants/author.constant";
import { MeliCategoryService } from "../MeliCategory/meli-category.service";
import { MeliItemService } from "../MeliItem/meli-item.service";
import ItemAuthorDetailDTO from "./dto/itemDetail.dto";
import ListItemsDTO from "./dto/listItems.dto";
import { ItemRepository } from "./item.respository";
import ItemMapper from "./mapper/item.mapper";
import ItemDetailMapper from "./mapper/itemDetail.mapper";

@Injectable()
export class ItemService {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly meliItemService: MeliItemService,
        private readonly categoryService: MeliCategoryService
    ){}   

    async listItems(query: string) : Promise<ListItemsDTO> {
        try{
            const meliItems = await this.meliItemService.getItems(query);
            const categories = await this.categoryService.findMostRepeatCategory(meliItems.map(item => item.category_id));

            return {
                author: {
                    name: Author.NAME,
                    lastname: Author.LASTNAME
                },
                categories: categories.path_from_root.map(category => category.name),
                items: ItemMapper.fromMeliArray(meliItems)
            }
        }
        catch(err){
            throw new Error(err);
        }
    }


    async getDetail(id: string): Promise<ItemAuthorDetailDTO>{
        try{
            const meliItemDetail = await this.meliItemService.getItemDetail(id);

            return ItemDetailMapper.fromMeliItem(meliItemDetail);
        }
        catch(err){
            throw new Error(err);
        }
    }

}