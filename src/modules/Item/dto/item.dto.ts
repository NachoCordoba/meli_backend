import { ApiProperty } from "@nestjs/swagger";
import ItemPriceDTO from "./itemPrice.dto";

export default class ItemDTO {
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    price: ItemPriceDTO;

    @ApiProperty()
    picture: string;

    @ApiProperty()
    condition: string;

    @ApiProperty()
    free_shipping: boolean;

    @ApiProperty()
    state_name: string;
} 