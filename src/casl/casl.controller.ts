import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CaslService } from './casl.service';
import { CreateCaslDto } from './dto/create-casl.dto';
import { UpdateCaslDto } from './dto/update-casl.dto';
import { PermissionAction } from 'src/ability/ability.factory';
import { CheckPermissions } from 'src/ability/permission.decorator';
import { PermissionsGuard } from 'src/ability/permission.gaurd';

@Controller('casl')
export class CaslController {
  constructor(private readonly caslService: CaslService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'Form'])
  create(@Body() createCaslDto: CreateCaslDto) {
    return this.caslService.create(createCaslDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @CheckPermissions(
    [PermissionAction.CREATE, 'Form'],
    [PermissionAction.READ, 'Form'],
  )
  findAll() {
    return this.caslService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caslService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaslDto: UpdateCaslDto) {
    return this.caslService.update(+id, updateCaslDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caslService.remove(+id);
  }
}
