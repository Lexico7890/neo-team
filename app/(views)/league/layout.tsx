'use client'

import NavBar from '@/app/components/navbar'
import SubMenu from '@/app/components/sub-menu'
import { Select, SelectItem } from '@nextui-org/react'

const categories = [
  'Masculino',
  'Femenino',
  'sub-13'
]

const levels = [
  'futbol 11',
  'futbol 8',
  'futbol 5'
]

const LayoutLeague = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className='p-3 flex gap-3 h-auto'>
      <SubMenu />
      <div className='flex flex-col w-full gap-3'>
        <div className='inline-flex gap-3'>
        <Select
          label="Categorías"
          placeholder="Ver categorías"
          // defaultSelectedKeys={["cat"]}
          className="max-w-xs"
        >
          {categories.map((animal, index) => (
            <SelectItem key={index} value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Tipos"
          placeholder="Ver tipos"
          // defaultSelectedKeys={["cat"]}
          className="max-w-xs"
        >
          {levels.map((animal, index) => (
            <SelectItem key={index} value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>
        </div>
        {children}
      </div>
      </div>
    </div>
  )
}

export default LayoutLeague
