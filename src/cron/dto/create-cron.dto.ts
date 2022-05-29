import { IsString } from "class-validator";

export class CreateCronDto {
    @IsString()
    name: string;

    @IsString()
    cronString: string;
}