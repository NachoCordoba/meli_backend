import { Injectable } from "@nestjs/common";
import { ItemRepository } from "./item.respository";

@Injectable()
export class ItemService {
    constructor(
        private readonly itemRepository: ItemRepository
    ){}

    async listItems(query: string){
        try{
            return await this.itemRepository.listItems(query);
        }
        catch(err){
            throw new Error(err);
        }        
    }

    async getDetail(id: string){
        try{
            return await this.itemRepository.getItemDetail(id);
        }
        catch(err){
            throw new Error(err);
        }
    }

}