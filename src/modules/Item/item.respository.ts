import { Injectable } from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { Author } from "../../constants/author.constant";
import ItemDetailDTO from "./dto/itemDetail.dto";
import ListItemsDTO from "./dto/listItems.dto";
import MeliItemDTO from "./dto/meliItem.dto";
import MeliItemDetailDTO from "./dto/meliItemDetail.dto";
import ItemMapper from "./mapper/item.mapper";
import ItemDetailMapper from "./mapper/itemDetail.mapper";

@Injectable()
export class ItemRepository{

    async getMeliItems(query: string) : Promise<Array<MeliItemDTO>> {
        try{
            const response = await axios.get(`${process.env.MELI_API}/sites/MLA/search?q=${query}&limit=4`);
            
            
            return response.data.results;
        }
        catch(err){
            if(axios.isAxiosError(err)){
                const axiosError = err as AxiosError<any>
                throw new Error(axiosError.response.data.message);
            }
            
            throw new Error(err);
        }
    }

    private findMostRepeatCategory(categories: Array<string>){
        if(categories.length == 0)
        return null;
        var modeMap = {};
        var maxEl = categories[0], maxCount = 1;
        for(var i = 0; i < categories.length; i++)
        {
            var el = categories[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    async listItems(query: string) : Promise<ListItemsDTO> {
        try{
            const meliItems = await this.getMeliItems(query);
            const categories = meliItems.map(item => item.category_id);
            const categoriesReq = await axios.get(`${process.env.MELI_API}/categories/${this.findMostRepeatCategory(categories)}`);

            return {
                author: {
                    name: Author.NAME,
                    lastname: Author.LASTNAME
                },
                categories: categoriesReq.data.path_from_root.map(category => category.name),
                items: ItemMapper.fromMeliArray(meliItems)
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async getMeliDetail(id: string) : Promise<MeliItemDetailDTO>{
        try{
            const itemResponse = await axios.get(`${process.env.MELI_API}/items/${id}`);
            const descriptionResponse = await axios.get(`${process.env.MELI_API}/items/${id}/description`);
            const categoriesReq = await axios.get(`${process.env.MELI_API}/categories/${itemResponse.data.category_id}`);

            return {
                ...itemResponse.data,
                categories: categoriesReq.data.path_from_root.map(category => category.name),
                description: descriptionResponse.data.plain_text
            };
        }
        catch(err){
            if(axios.isAxiosError(err)){
                const axiosError = err as AxiosError<any>
                throw new Error(axiosError.response.data.message);
            }
            throw new Error(err);
        }
    }

    async getItemDetail(id: string): Promise<ItemDetailDTO>{
        try{
            const meliItemDetail = await this.getMeliDetail(id);

            return ItemDetailMapper.fromMeliItem(meliItemDetail);
        }
        catch(err){
            throw new Error(err);
        }
    }
}