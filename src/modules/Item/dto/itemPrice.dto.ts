import { ApiProperty } from "@nestjs/swagger";

export default class ItemPriceDTO {
    @ApiProperty()
    currency: string;
    
    @ApiProperty()
    amount: number;

    @ApiProperty()
    decimals: number;
}