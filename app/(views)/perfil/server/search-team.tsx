import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import SearchTeamClient from '../client/search-team-client'
import { cookies } from 'next/headers'

const SearchTeam = () => {
  const supabase = createServerComponentClient({ cookies })

  return <SearchTeamClient />
}

export default SearchTeam
