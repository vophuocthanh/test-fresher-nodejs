import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNoteDto } from 'src/modules/notes/dto/create.dto';
import {
  NotePaginationResponseType,
  NotesDto,
} from 'src/modules/notes/dto/note.dto';
import { UpdateNoteDto } from 'src/modules/notes/dto/update.dto';
import { NotesService } from 'src/modules/notes/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async getAllNotes(
    @Query() params: NotesDto,
  ): Promise<NotePaginationResponseType> {
    return this.notesService.getNotes(params);
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string) {
    return this.notesService.getNoteById(id);
  }

  @Post()
  async createNote(@Body() createNote: CreateNoteDto) {
    return this.notesService.createNote(createNote);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() updateNote: UpdateNoteDto) {
    return this.notesService.updateNote(id, updateNote);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNoteById(id);
  }
}
