import { defineStore } from 'pinia'
import gameService from '@/services/game.service'
import type { ICurrentRoundData, IHorse, IRaceResult, IRaceSchedule, IRaceStatus } from '@/types'

export const useRaceStore = defineStore('race', {
  state: () => ({
    allHorses: gameService.generateRaceHorses(20) as IHorse[],
    raceSchedule: [] as IRaceSchedule[],
    raceResults: [] as IRaceResult[],
    currentRoundData: undefined as ICurrentRoundData | undefined,
    currentRound: -1,
    raceStatus: 'not_initiated' as
      | 'not_initiated'
      | 'not_started'
      | 'in_progress'
      | 'finished'
      | 'paused',
  }),

  actions: {
    initializeRaceSchedule() {
      const allHorses = this.allHorses

      this.raceSchedule = gameService.initializeRaceSchedule(6, allHorses, 10)
      this.currentRound = -1
      this.currentRoundData = undefined
      this.raceStatus = 'not_started'
      this.raceResults = []

      this.startNextRound()
    },

    startNextRound() {
      const nextRound = this.currentRound + 1

      if (nextRound < this.raceSchedule.length) {
        const roundSchedule = this.raceSchedule[nextRound]
        if (roundSchedule) {
          const currentRoundData = {
            round: roundSchedule.round,
            distance: roundSchedule.distance,
            participants: roundSchedule.participants.map((horse) => ({
              ...horse,
              traveledDistance: 0,
              position: 0,
            })),
          }

          this.currentRound = nextRound
          this.currentRoundData = currentRoundData
        }
      }
    },

    updateRaceStatus(status: IRaceStatus) {
      this.raceStatus = status
    },

    updateHorsePositions() {
      if (!this.currentRoundData) {
        this.raceStatus = 'not_started'
        return
      }

      const finishedData = [] as { index: number; priority: number }[]
      const updatedParticipants = this.currentRoundData.participants.map((horse, index) => {
        const newTraveledDistance = horse.traveledDistance + horse.condition * 0.1

        if (newTraveledDistance >= this.currentRoundData!.distance && horse.position === 0) {
          finishedData.push({ index, priority: newTraveledDistance })
        }

        return {
          ...horse,
          traveledDistance: Math.min(newTraveledDistance, this.currentRoundData!.distance),
        }
      })

      if (finishedData.length > 0) {
        let lastPosition = this.currentRoundData.participants.filter((h) => h.position > 0).length

        finishedData
          .sort((a, b) => {
            if (b.priority !== a.priority) {
              return b.priority - a.priority
            }
            return a.index - b.index
          })
          .forEach((data) => {
            lastPosition += 1
            const participant = updatedParticipants[data.index]
            if (participant) {
              participant.position = lastPosition
            }
          })
      }

      if (this.currentRoundData.participants.every((horse) => horse.position > 0)) {
        this.raceResults = [
          ...this.raceResults,
          {
            round: this.currentRoundData.round,
            distance: this.currentRoundData.distance,
            results: [...updatedParticipants]
              .sort((a, b) => a.position - b.position)
              .map((horse) => ({
                id: horse.id,
                name: horse.name,
                color: horse.color,
                position: horse.position,
              })),
          },
        ]

        this.raceStatus = 'finished'
      }

      this.currentRoundData = {
        ...this.currentRoundData,
        participants: updatedParticipants,
      }
    },
  },
})
