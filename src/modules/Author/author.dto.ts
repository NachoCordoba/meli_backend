import { ApiProperty } from "@nestjs/swagger";
import { Author } from "src/constants/author.constant";

export default class AuthorDTO {
    
    @ApiProperty()
    name: string = Author.NAME;

    @ApiProperty()
    lastname: string = Author.LASTNAME
};