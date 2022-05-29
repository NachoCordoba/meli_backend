import ItemDTO from "../dto/item.dto";
import MeliItemDTO from "../dto/meliItem.dto";

export default class ItemMapper {
    static fromMeliItem(meliItem : MeliItemDTO) : ItemDTO{
        return {
            id: meliItem.id,
            title: meliItem.title,
            price: {
                amount: meliItem.price,
                currency: meliItem.currency_id,
                decimals: 2
            },
            condition: meliItem.condition,
            picture: meliItem.thumbnail,
            free_shipping: meliItem.shipping.free_shipping,
            state_name: meliItem.address.state_name
        }
    }

    static fromMeliArray(meliItems: Array<MeliItemDTO>): Array<ItemDTO>{
        return meliItems.map(meliItem => this.fromMeliItem(meliItem));
    }
}