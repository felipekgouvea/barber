'use client'

import { SearchIcon } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
 
const createFormSchema = z.object({
  search: z.string({
    required_error:"Campo obrigatório",
  }).trim().min(1, "Campo obrigatório."),
})

type CreateFormSchema = z.infer<typeof createFormSchema>

const Search = () => {
  const router = useRouter()

  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema)
  })

  const handleSubmint = (data:CreateFormSchema) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form className='flex w-full gap-4' onSubmit={form.handleSubmit(handleSubmint)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className='w-full'>              
              <FormControl>
                <Input placeholder="Busque por uma barbearia" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button variant="default" type='submit'>
          <SearchIcon size={20} />
        </Button>

        </form>
      </Form>
    </div>
  )
}

export default Search
