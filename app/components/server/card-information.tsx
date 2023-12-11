import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

interface Props {
  title: string
  icon: JSX.Element
  value: string
}

const CardInformation = ({ icon, title, value }: Props) => {
  return (
    <Card>
      <CardHeader>{title} {icon}</CardHeader>
      <CardContent>{value}</CardContent>
    </Card>
  )
}

export default CardInformation
