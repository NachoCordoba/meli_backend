import { Injectable } from "@nestjs/common";
import MeliCategoryDTO from "./dto/meli-category.dto";
import { MeliCategoryRepository } from "./meli-category.respository";

@Injectable()
export class MeliCategoryService {
    constructor(
        private readonly categoryRepository: MeliCategoryRepository
    ){}

    async getCategory(id: string): Promise<MeliCategoryDTO>{
        return this.categoryRepository.getCategory(id);
    }

    async findMostRepeatCategory(categories: Array<string>): Promise<MeliCategoryDTO>{
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
        return this.getCategory(maxEl);
    }
}