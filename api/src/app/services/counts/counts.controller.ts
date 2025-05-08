import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountsService } from './counts.service';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';

@Controller('counts')
export class CountsController {
  constructor(private readonly countsService: CountsService) {}

  @Post()
  create(@Body() createCountDto: CreateCountDto) {
    return this.countsService.create(createCountDto);
  }

  @Get()
  findAll() {
    return this.countsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountDto: UpdateCountDto) {
    return this.countsService.update(+id, updateCountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countsService.remove(+id);
  }
}
