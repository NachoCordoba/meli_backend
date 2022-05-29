import { Injectable } from "@nestjs/common";
import axios, { AxiosError } from "axios";
import MeliItemDetailDTO from "./dto/meli-item-detail.dto";
import MeliItemDTO from "./dto/meli-item.dto";

@Injectable()
export class MeliItemRepository {
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
}