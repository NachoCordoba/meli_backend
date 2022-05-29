import { ApiProperty } from "@nestjs/swagger";
import AuthorDTO from "../../Author/author.dto";
import ItemDTO from "./item.dto";

class ItemDetailDTO extends ItemDTO {
    @ApiProperty()
    sold_quantity: number;

    @ApiProperty()
    description: string;
}

export default class ItemAuthorDetailDTO{
    @ApiProperty()
    author: AuthorDTO;

    @ApiProperty()
    categories: Array<string>;

    @ApiProperty()
    item: ItemDetailDTO;
}