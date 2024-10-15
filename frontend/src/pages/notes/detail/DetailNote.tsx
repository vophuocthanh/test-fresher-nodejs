import { noteApi } from '@/apis/notes.api';
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
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

export default function DetailNote() {
  const { id } = useParams();
  const form = useForm({});

  const { data: getNoteById } = useQuery({
    queryKey: ['getNoteById', id],
    queryFn: () => noteApi.getById(id as string),
  });

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
          Chi tiết ghi chú:{' '}
          <span className='text-[#FFB0B0]'>{getNoteById?.title}</span>
        </h1>
      </div>
      <Form {...form}>
        <form className='w-full space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập title'
                    {...field}
                    value={getNoteById?.title}
                  />
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
                    value={getNoteById?.content}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
