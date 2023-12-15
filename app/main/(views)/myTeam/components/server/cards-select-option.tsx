import Image from 'next/image'
import React from 'react'
import teamCard from '@/public/image/teamCard.png'
import teamCardPlayer from '@/public/image/teamCardPlayer.png'
import teamCardTwo from '@/public/image/teamCardTwo.png'
import teamCardTwoPlayer from '@/public/image/teamCardTwoPlayer.png'
import styles from '../styles.module.css'
import { Button } from '@/components/ui/button'

const CardsSelectOption = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className={`${styles.container} flex flex-row justify-center p-10`}>
        <div className={styles.card}>
          <div className={`${styles.imgBx} bg-red-600`}>
            <Image
              src={teamCardTwo}
              height={300}
              width={300}
              alt="Image card team"
            />
          </div>
          <Image
            id="c3d"
            src={teamCardTwoPlayer}
            height={330}
            width={330}
            alt="Image card team player"
            className={`${styles.c3d}`}
          />
          <Button
            variant={'outline'}
            className="dark:bg-black bg-white font-semibold text-lg"
          >
            Crear equipo
          </Button>
        </div>
        <div className={styles.card}>
          <div className={`${styles.imgBx} bg-yellow-400`}>
            <Image
              src={teamCard}
              height={350}
              width={350}
              alt="Image card team"
            />
          </div>
          <Image
            id="c3d"
            src={teamCardPlayer}
            height={330}
            width={330}
            alt="Image card team player"
            className={`${styles.c3d}`}
          />
          <Button
            variant={'outline'}
            className="dark:bg-black bg-white font-semibold text-lg"
          >
            Buscar equipo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardsSelectOption
