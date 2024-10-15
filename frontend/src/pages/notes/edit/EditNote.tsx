import { noteApi } from '@/apis/notes.api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UpdateNoteSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

export default function EditNote() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UpdateNoteSchema>>({
    resolver: zodResolver(UpdateNoteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const { data: getNoteById, isLoading } = useQuery({
    queryKey: ['getNoteByIdEdit', id],
    queryFn: () => noteApi.getById(id as string),
  });

  useEffect(() => {
    if (getNoteById) {
      form.reset({
        title: getNoteById.title,
        content: getNoteById.content,
      });
    }
  }, [getNoteById, form]);

  const mutationUpdateNote = useMutation({
    mutationFn: (data: z.infer<typeof UpdateNoteSchema>) => {
      if (!id) {
        throw new Error('Note ID is required');
      }
      return noteApi.updateNote(id, data);
    },
  });

  const onSubmitUpdate = (data: z.infer<typeof UpdateNoteSchema>) => {
    setLoading(true);
    mutationUpdateNote.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getNoteByIdEdit', id] });
        toast.success('Cập nhật ghi chú thành công');
      },
      onError: () => {
        toast.error('Cập nhật ghi chú thất bại');
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-full'>Loading...</div>
    );

  return (
    <div className='w-full h-full p-4 bg-white rounded-md'>
      <div className='flex items-center gap-4'>
        <Link
          to='/notes'
          className='flex items-center w-32 gap-4 p-2 my-2 bg-gray-300 rounded-md'
        >
          <ChevronLeft className='w-6 h-6' />
          <span>Quay lại</span>
        </Link>
        <h1 className='text-2xl font-bold'>
          Chỉnh sửa ghi chú:{' '}
          <span className='text-[#FFB0B0]'>{getNoteById?.title}</span>
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitUpdate)}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Nhập nội dung.'
                    {...field}
                    className='h-96'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button loading={loading} type='submit'>
            Cập nhật
          </Button>
        </form>
      </Form>
    </div>
  );
}
