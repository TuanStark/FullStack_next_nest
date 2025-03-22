import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

function generateSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// Seed the database with some users -> fake data users
async function main() {
    const defaultPassword = await hash('123');
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        password: defaultPassword,
    }));
    
    await prisma.user.createMany({
        data: users
    });

    const posts = Array.from({ length: 10 }).map(() => ({
        title: faker.lorem.sentence(),
        slug: generateSlug(faker.lorem.sentence()),
        content: faker.lorem.paragraph(3),
        thumbnail: faker.image.urlLoremFlickr(),
        published: true,
        authorId: faker.number.int({ min: 1, max: 10 })
    }));

    await Promise.all(
        posts.map(async (post) => await prisma.post.create({
            data: {
                ...post,
                comments: {
                    createMany: {
                        data: Array.from({ length: 5 }).map(() => ({
                            content: faker.lorem.sentence(),
                            authorId: faker.number.int({ min: 1, max: 10 }),
                        }))
                    }
                }
            }
        })
        )
    );

    console.log('Seeded Completed');
}

main().then(() => {
    prisma.$disconnect();
    process.exit(0);
}).catch((e) => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
}
);
// trong package.json cua api them doan script duoi de khi
// chay lenh npm run db:seed thi se seed du lieu(fake du lieu do)
//"db:seed": "ts-node ./prisma/seed.ts"