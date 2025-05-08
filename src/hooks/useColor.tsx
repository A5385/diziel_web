import { ColorType } from '@/types/ui';

export const useColor = (color: ColorType) => {
    return {
        red: 'bg-red-500 hover:bg-red-700 text-white hover:text-white',
        orange: 'bg-orange-500  hover:bg-orange-700 text-white hover:text-white',
        gray: 'bg-gray-500 hover:bg-gray-700 text-white hover:text-white',
        green: 'bg-green-500 hover:bg-green-700 text-white hover:text-white',
        purple: 'bg-purple-500 hover:bg-purple-700 text-white hover:text-white',
        main: 'bg-blue-500 hover:bg-blue-700 text-white hover:text-white',
        default: '',
    }[color];
};
