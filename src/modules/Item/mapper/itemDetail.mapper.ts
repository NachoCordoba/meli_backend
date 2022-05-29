import { Author } from "src/constants/author.constant";
import ItemDetailDTO from "../dto/itemDetail.dto";
import MeliItemDetailDTO from "../dto/meliItemDetail.dto";

export default class ItemDetailMapper{
    static fromMeliItem(meliItemDetail: MeliItemDetailDTO) : ItemDetailDTO{
        return {
            author:{
                name: Author.NAME,
                lastname: Author.LASTNAME
            },
            categories: meliItemDetail.categories,
            item: {
                id: meliItemDetail.id,
                title: meliItemDetail.title,
                price: {
                    amount: meliItemDetail.price,
                    currency: meliItemDetail.currency_id,
                    decimals: 2
                },
                condition: meliItemDetail.condition,
                picture: meliItemDetail.thumbnail,
                free_shipping: meliItemDetail.shipping.free_shipping,
                sold_quantity: meliItemDetail.sold_quantity,
                description: meliItemDetail.description,
                state_name: meliItemDetail.seller_address.state.name
            }
        }
    }
}