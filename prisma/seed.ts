import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1590358618263658499/svKpLfgs_400x400.jpg",
    },
  });
  const pool = await prisma.pool.create({
    data: {
      title: "example",
      code: "tajmahal",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-20T16:00:00.142Z",
      fistTeamCountryCode: "QA",
      secondTeamCountryCode: "EC",

      guesses: {
        create: {
          fistTeamPoints: 1,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T13:00:00.142Z",
      fistTeamCountryCode: "GB",
      secondTeamCountryCode: "IR",
    },
  });
}
main();
