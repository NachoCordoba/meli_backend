import MeliItemDTO from "./meliItem.dto";

export default class MeliItemDetailDTO extends MeliItemDTO{ 
    sold_quantity: number;
    description: string;
    seller_address: {
        state: { name: string }
    }
}