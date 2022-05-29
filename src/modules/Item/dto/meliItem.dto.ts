export default class MeliItemDTO {
    id: string;
    title: string;
    price: number;
    currency_id: string;
    shipping: {
        free_shipping: boolean;
    };
    condition: string;
    thumbnail: string;
    category_id: string;
    categories?: Array<string>;
    address: {
        state_name: string;
    }
}