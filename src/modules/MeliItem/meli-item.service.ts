import { Injectable } from "@nestjs/common";
import MeliItemDetailDTO from "./dto/meli-item-detail.dto";
import MeliItemDTO from "./dto/meli-item.dto";
import { MeliItemRepository } from "./meli-item.repository";

@Injectable()
export class MeliItemService {
    constructor(
        private meliItemRepository: MeliItemRepository
    ){}

    async getItems(query: string) : Promise<Array<MeliItemDTO>>{
        return await this.meliItemRepository.getMeliItems(query);
    }

    async getItemDetail(id: string): Promise<MeliItemDetailDTO>{
        return await this.meliItemRepository.getMeliDetail(id);
    }
}