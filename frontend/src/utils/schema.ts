import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const UpdateNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});
