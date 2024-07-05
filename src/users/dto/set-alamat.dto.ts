import { IsNotEmpty, IsString } from 'class-validator';

export class SetAlamatDto {
  @IsNotEmpty()
  @IsString()
  alamat: string;
}
