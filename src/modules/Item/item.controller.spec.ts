import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './item.respository';
import ListItemsDTO from './dto/listItems.dto';
import {config} from 'dotenv'

describe('Modulo Item', ()=>{
    let itemController: ItemController;
    config();

    beforeEach(async ()=>{
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ItemController],
            providers: [ItemService, ItemRepository]
        }).compile();

        

        itemController = app.get<ItemController>(ItemController);
    })

    describe('Listado de Items', ()=>{
        it('debería devolver un listado de items', async ()=>{
            expect(itemController.getItems({})).resolves
        })

        it('debería devolver un listado de items filtrados', async ()=>{
            expect(itemController.getItems({ q: 'B'})).resolves
        })
    })

    describe('Detalle de Item', ()=>{
        it('debería devolver un detalle de Item', async ()=>{
            expect(itemController.getItemDetail('MLA919458461')).resolves
        })

        it('debería devolver un error de listado de items filtrados', async ()=>{
            expect(itemController.getItemDetail('MLA91945846')).rejects.toThrow()
        })
    })
});