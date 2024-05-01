'use client'

import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { SearchIcon } from 'lucide-react'

const Search = () => {
  return (
    <div className="flex items-center gap-2">
      <Input
        className="text-muted-foreground"
        placeholder="Busque por uma barbearia..."
      />
      <Button>
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}

export default Search