import { Notes } from '@prisma/client';

export class NotesDto {
  search?: string;
  items_per_page?: number;
  page?: number;
}

export interface NotePaginationResponseType {
  data: Notes[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
}
