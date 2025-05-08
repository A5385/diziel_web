// api\src\config\validation-pipe.config.ts

import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';

export const ValidationPipeConfig: ValidationPipeOptions = {
    whitelist: true,
    transform: true,
    exceptionFactory: (validationErrors = []) => {
        const formattedErrors = validationErrors
            .map((error) => {
                const constraints = Object.values(error.constraints || {}).join(', ');
                return `${error.property}: ${constraints}`;
            })
            .join(', ');

        throw new BadRequestException({
            message: `Validation failed. Please correct the following: ${formattedErrors}`,
        });
    },
};
