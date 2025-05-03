import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const datasourceUrl = process.env.DATABASE_URL;

if (!datasourceUrl) {
    console.error('DATABASE_URL is not set in the environment variables.');
    process.exit(1);
}

const prisma = new PrismaClient();

const { password, phone, ...user } = {
    phone: '+201033033130',
    password: '123456789',
    role: 'admin' as UserRole,
    verified: new Date(),
};

async function main() {
    try {
        const isUserExist = await prisma.user.findUnique({
            where: {
                phone,
            },
        });

        if (isUserExist) {
            // await prisma.user.delete({ where: { phone } });
            console.log(`User already exists with phone: ${phone}`);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        if (!hashedPassword) {
            console.error('Error hashing password');
            return;
        }
        const admin = await prisma.user.create({
            data: {
                ...user,
                phone,
                hashedPassword,
                profile: {
                    create: {
                        fullName: 'Ahmed Khaled',
                        email: 'ahmed.5aled1985@gmail.com',
                        nickname: 'Meda',
                        profileComplete: new Date(),
                        national: { create: { nationalIdNumber: '28510028800154' } },
                    },
                },
                loginInfo: { create: {} },
            },
            include: { profile: true },
        });

        console.log('Admin user created:', admin);
    } catch (error) {
        console.error('Error during seed process:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the main function
main().catch((error) => {
    console.error('Error in main function:', error);
});
