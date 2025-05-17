import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '@/types/prisma';
import { UserSchema } from '@/types/schema';

const UserAvatar = ({ user }: { user: UserSchema }) => {
    const image = user.profile?.image;
    const name = user.profile?.fullName;
    const splitName = name?.split(' ');
    const fallBack = (splitName?.[0]?.[0] ?? 'D') + (splitName?.[1]?.[0] ?? 'D');
    const role = user.role ?? 'admin';

    const avatarImage: Record<UserRole, string> = {
        admin: '/avatar/avatar1.png',
        operator: '/avatar/avatar2.png',
        employee: '/avatar/avatar3.png',
        client: '/avatar/avatar.png',
        agency: '/avatar/avatar.png',
        agencyAgent: '/avatar/avatar.png',
        owner: '/avatar/avatar.png',
        driver: '/avatar/driver_avatar.png',
    };

    return (
        <Avatar>
            <AvatarImage src={image ?? avatarImage[role]} alt='user' />
            <AvatarFallback>{fallBack}</AvatarFallback>
        </Avatar>
        // <Image
        //     src={image ?? '/avatar.png'}
        //     alt={row?.original?.profile?.fullName ?? 'user-image'}
        //     width={50}
        //     height={50}
        // />
    );
};

export default UserAvatar;
