import { Controller, Get, Param, Query } from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiQuery, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiProperty, ApiParam } from "@nestjs/swagger";
import ItemDetailDTO from "./dto/itemDetail.dto";
import ListItemsDTO from "./dto/listItems.dto";
import RequestItems from "./interface/requestItems";
import { ItemService } from "./item.service";

@Controller({
    path: '/items',
})
@ApiTags('Items')
export class ItemController {
    constructor(
        private readonly itemService: ItemService
    ){}

    @Get('/')
    @ApiQuery({
        name: 'q',
        type: String,
        required: false,
        description: 'Query de Busqueda'
    })
    @ApiResponse({
        status: 200,
        description: 'Obtiene todos los Items',
        type: ListItemsDTO,
    })
    @ApiInternalServerErrorResponse({
        description: 'Posible falla de conexion con API de Mercadolibre',
    })
    async getItems(@Query() queryParams: RequestItems){
        try{
            return await this.itemService.listItems(queryParams.q);
        }
        catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    @ApiParam({
        name: 'id',
        description: 'ID del Item'
    })
    @ApiResponse({
        status: 200,
        description: 'Obtiene el detalle del Item',
        type: ItemDetailDTO,
    })
    @ApiNotFoundResponse({
        description: 'No encuentra el Item'
    })
    @ApiInternalServerErrorResponse({
        description: 'Posible falla de conexion con API de Mercadolibre',
    })
    async getItemDetail(@Param('id') id: string){
        try{
            return await this.itemService.getDetail(id);
        }
        catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}