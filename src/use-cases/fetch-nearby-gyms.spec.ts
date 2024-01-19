import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'zam zam zam zam',
      phone: '123123123',
      latitude: -29.7224574,
      longitude: -52.4447034,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'cam cam cam cam',
      phone: '123123123',
      latitude: -29.9845187,
      longitude: -52.3771476,
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.7224574,
      userLongitude: -52.4447034,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
