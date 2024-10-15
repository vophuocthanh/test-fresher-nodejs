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
import { CreateNoteSchema } from '@/utils/schema';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '../../../../node_modules/@hookform/resolvers/zod/src/zod';

export default function CreateNote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const mutationCreateNote = useMutation({
    mutationFn: (data: z.infer<typeof CreateNoteSchema>) => {
      return noteApi.createNote(data);
    },
  });

  function onSubmit(data: z.infer<typeof CreateNoteSchema>) {
    setLoading(true);
    mutationCreateNote.mutate(data, {
      onSuccess: () => {
        navigate('/notes');
        toast.success('Tạo ghi chú thành công');
      },
      onError: () => {
        toast.error('Tạo ghi chú thất bại');
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  }
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
        <h1 className='text-2xl font-bold'>Tạo ghi chú mới</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
            Tạo
          </Button>
        </form>
      </Form>
    </div>
  );
}
