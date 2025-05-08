// api\src\config\config.config.ts

import { ConfigModuleOptions } from '@nestjs/config';

export const ConfigModuleOption: ConfigModuleOptions<Record<string, any>> | undefined = {
    isGlobal: true,
};
