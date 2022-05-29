import { ApiProperty } from "@nestjs/swagger";
import AuthorDTO from "../../Author/author.dto";
import ItemDTO from "./item.dto";

export default class ListItemsDTO {

    @ApiProperty()
    author: AuthorDTO

    @ApiProperty()
    categories: Array<string>;

    @ApiProperty({
        isArray: true,
        type: ItemDTO,
    })
    items: Array<ItemDTO>;
}