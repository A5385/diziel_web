import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExcelService {
    async generateExcel<T extends object>(
        res: Response,
        data: T[],
        filename: string = 'export.xlsx',
    ) {
        try {
            if (!data || data.length === 0) {
                throw new NotFoundException('No data provided. Please provide data to export.');
            }

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Data');

            const fields = Object.keys(data[0]) as (keyof T)[];
            worksheet.columns = fields.map((col) => ({
                header: col as string,
                key: col as string,
            }));

            data.forEach((item) => {
                worksheet.addRow(fields.map((field) => item[field])); // Dynamically map values
            });

            // Convert to Buffer
            const buffer = await workbook.xlsx.writeBuffer();

            res.header('Content-Disposition', `attachment; filename=${filename}`);
            res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            return res.send(buffer);
        } catch (error) {
            console.error('❌ Error generating Excel:', error);
            throw new InternalServerErrorException(
                'An error occured while creating excel',
                JSON.stringify(error, null, 2),
            );
        }
    }
}
