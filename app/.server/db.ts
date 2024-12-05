import { PrismaClient } from '@prisma/client';
declare global {
    var __prisma: PrismaClient;
}
if (!global.__prisma) {
    global.__prisma = new PrismaClient();
}
global.__prisma.$connect();
export const prisma = global.__prisma;

export const getSettings = async (
    page: string,
    userId: string,
    hostname: string,
) =>
    await prisma.settings.findFirst({
        where: {
            page,
            userId,
            hostname,
        },
    });

export const createSettings = async (settings: any) => {
    const newSettings = await prisma.settings.create({
        data: settings,
    });

    return newSettings;
};

export const setSettings = async (page: string, settigns: any) => {
    const updatedSettings = await prisma.settings.update({
        where: { id: settigns.id },
        data: settigns,
    });

    return updatedSettings;
};
