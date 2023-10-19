export interface League {
  name: string
  info: Info[]
}

export interface Info {
  name: string
  gamePlayed: string
  wonGames: string
  tiedGames: string
  lostGames: string
  goalsFavor: string
  goalsAgainst: string
  goalDifference: string
}
