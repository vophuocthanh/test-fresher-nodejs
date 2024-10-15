import { Module } from '@nestjs/common';
import { PrismaService } from 'src/middleware/prisma.service';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
})
export class NotesModule {}
