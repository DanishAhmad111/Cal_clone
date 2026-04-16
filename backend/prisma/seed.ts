import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing database...')
  await prisma.booking.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.eventType.deleteMany()
  await prisma.user.deleteMany()

  console.log('Seeding database...')

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe',
      timezone: 'America/New_York',
    },
  })

  const eventType1 = await prisma.eventType.create({
    data: {
      title: '15 Min Chat',
      description: 'A quick 15 minute catch up chat.',
      duration: 15,
      slug: '15-min-chat',
      userId: user.id,
      isActive: true,
    },
  })

  const eventType2 = await prisma.eventType.create({
    data: {
      title: '30 Min Meeting',
      description: 'A half-hour project discussion.',
      duration: 30,
      slug: '30-min-meeting',
      userId: user.id,
      isActive: true,
    },
  })

  const eventType3 = await prisma.eventType.create({
    data: {
      title: '1 Hour Consultation',
      description: 'A deep dive into your business needs.',
      duration: 60,
      slug: '1-hour-consultation',
      userId: user.id,
      isActive: true,
    },
  })

  // Add Mon-Fri 9-5 availability
  for (let i = 0; i < 7; i++) {
    await prisma.availability.create({
      data: {
        userId: user.id,
        dayOfWeek: i,
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: i > 0 && i < 6, // availability only Mon-Fri
      },
    })
  }

  // Create sample bookings
  const now = new Date()

  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)

  const dayAfter = new Date(now)
  dayAfter.setDate(dayAfter.getDate() + 2)
  dayAfter.setHours(14, 30, 0, 0)

  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)
  nextWeek.setHours(9, 15, 0, 0)

  const pastDate1 = new Date(now)
  pastDate1.setDate(pastDate1.getDate() - 2)
  pastDate1.setHours(11, 0, 0, 0)

  const pastDate2 = new Date(now)
  pastDate2.setDate(pastDate2.getDate() - 5)
  pastDate2.setHours(15, 0, 0, 0)

  // Upcoming confirmed
  await prisma.booking.create({
    data: {
      eventTypeId: eventType2.id,
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 30 * 60000), // +30 mins
      bookerName: 'Alice Smith',
      bookerEmail: 'alice@example.com',
      status: 'CONFIRMED',
      notes: 'Looking forward to our chat!',
    },
  })

  await prisma.booking.create({
    data: {
      eventTypeId: eventType3.id,
      startTime: dayAfter,
      endTime: new Date(dayAfter.getTime() + 60 * 60000), // +60 mins
      bookerName: 'Bob Johnson',
      bookerEmail: 'bob@example.com',
      status: 'CONFIRMED',
      notes: 'Please review the attached documents beforehand.',
    },
  })

  await prisma.booking.create({
    data: {
      eventTypeId: eventType1.id,
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 15 * 60000), // +15 mins
      bookerName: 'Charlie Davis',
      bookerEmail: 'charlie.davis@example.org',
      status: 'CONFIRMED',
      notes: 'Quick sync up',
    },
  })

  // Upcoming cancelled
  await prisma.booking.create({
    data: {
      eventTypeId: eventType2.id,
      startTime: new Date(nextWeek.getTime() + 86400000), // next week + 1 day
      endTime: new Date(nextWeek.getTime() + 86400000 + 30 * 60000),
      bookerName: 'Diana Prince',
      bookerEmail: 'diana@example.com',
      status: 'CANCELLED',
      notes: 'Need to reschedule',
    },
  })

  // Past confirmed
  await prisma.booking.create({
    data: {
      eventTypeId: eventType3.id,
      startTime: pastDate1,
      endTime: new Date(pastDate1.getTime() + 60 * 60000),
      bookerName: 'Edward Elric',
      bookerEmail: 'edward@example.com',
      status: 'CONFIRMED',
      notes: 'Discussing the new architectural plans.',
    },
  })

  // Past cancelled
  await prisma.booking.create({
    data: {
      eventTypeId: eventType1.id,
      startTime: pastDate2,
      endTime: new Date(pastDate2.getTime() + 15 * 60000),
      bookerName: 'Fiona Gallagher',
      bookerEmail: 'fiona@example.com',
      status: 'CANCELLED',
      notes: 'Forgot I had an appointment.',
    },
  })

  console.log('Done mapping defaults.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
