import { FilterType } from '@/lib/data'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'
import DateTimeFilter from './DateTimeFilter'

const FIlter = ({ completeCount = 0, activeCount = 0, filter = "all", setFilter, dateQuery, setDateQuery }) => {
  
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center '>

      <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
      <div className="flex flex-row gap-2 sm:flex-row">
        {
          Object.keys(FilterType).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'gradient' : 'ghost'}
              size='sm'
              className='capitalize cursor-pointer'
              onClick={() => setFilter(type)}
            >
              <Filter className='size-4' />
              {FilterType[type]}
            </Button>
          ))
        }
      </div>
      <div className="flex-row gap-3">
        <Badge
          variant="secondary"
          className='bg-white/50 text-accent-foreground border-info/20'
        >
          {activeCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className='bg-white/50 text-success border-success/20'
        >
          {completeCount} {FilterType.completed}
        </Badge>
      </div>
    </div>
  )
}

export default FIlter