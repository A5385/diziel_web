import constants from '@/constants/AppSettings';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({ ...constants.locale });
