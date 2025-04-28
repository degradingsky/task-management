import { IsString } from "class-validator";

export default class IdParam {
    @IsString()
    id: string
}