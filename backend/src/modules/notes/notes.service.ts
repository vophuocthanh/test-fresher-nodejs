import { Injectable } from '@nestjs/common';
import { Notes } from '@prisma/client';
import { PrismaService } from 'src/middleware/prisma.service';
import { CreateNoteDto } from 'src/modules/notes/dto/create.dto';
import {
  NotePaginationResponseType,
  NotesDto,
} from 'src/modules/notes/dto/note.dto';
import { UpdateNoteDto } from 'src/modules/notes/dto/update.dto';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  async getNotes(filters: NotesDto): Promise<NotePaginationResponseType> {
    const items_per_page = Number(filters.items_per_page) || 10;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const notes = await this.prismaService.notes.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * items_per_page,
      take: items_per_page,
    });

    const total = await this.prismaService.notes.count({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    return {
      data: notes,
      total,
      currentPage: page,
      itemsPerPage: items_per_page,
    };
  }

  async getNoteById(id: string) {
    return this.prismaService.notes.findUnique({
      where: {
        id,
      },
    });
  }

  async createNote(
    data: CreateNoteDto,
  ): Promise<{ message: string; data: Notes }> {
    const create = await this.prismaService.notes.create({
      data: {
        ...data,
        content: data.content || '',
      },
    });
    return {
      message: 'Note created successfully',
      data: create,
    };
  }

  async updateNote(
    id: string,
    data: UpdateNoteDto,
  ): Promise<{ message: string; data: Notes }> {
    const update = await this.prismaService.notes.update({
      where: {
        id,
      },
      data,
    });
    return {
      message: 'Note updated successfully',
      data: update,
    };
  }
  async deleteNoteById(id: string): Promise<{ message: string }> {
    await this.prismaService.notes.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Note deleted successfully',
    };
  }
}
