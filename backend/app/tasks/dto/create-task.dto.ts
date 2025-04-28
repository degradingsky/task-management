import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Milk, eggs, and bread' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Pending', enum: ['Pending', 'Completed'], required: false })
  @IsOptional()
  @IsIn(['Pending', 'Completed'])
  status?: 'Pending' | 'Completed';
}
