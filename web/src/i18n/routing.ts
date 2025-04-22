import constants from '@/constants/constants';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({ ...constants.locale });
