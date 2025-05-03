import { UserRole } from '@/types/prisma';

export const roleList = Object.values(UserRole).map((role) => role);
