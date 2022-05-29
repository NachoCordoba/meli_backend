import { Injectable } from "@nestjs/common";
import axios from "axios";
import MeliCategoryDTO from "./dto/meli-category.dto";

@Injectable()
export class MeliCategoryRepository {
    async getCategory(id: string) : Promise<MeliCategoryDTO>{
        const categoriesReq = await axios.get(`${process.env.MELI_API}/categories/${id}`);
        return categoriesReq.data;
    }
}