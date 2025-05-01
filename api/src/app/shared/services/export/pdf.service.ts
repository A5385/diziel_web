import { Injectable } from '@nestjs/common';

@Injectable()
export class PDFService {
    // private doc: jsPDF;
    private readonly xMargin = 20;
    private readonly yMargin = 30;
    // private indexData: index[] = [];
    private x: number;
    private y: number;

    // private defaultTableOptions: TableOptions = {
    //     tableName: 'default table name',
    //     ignoreFields: [],
    //     addToIndex: false,
    // };

    // constructor() {
    //     this.doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    //     this.resetXandY();
    //     this.updatePointer();
    // }

    // private resetXandY() {
    //     this.x = this.xMargin;
    //     this.y = this.yMargin;
    // }

    // private updatePointer() {
    //     this.doc.moveTo(this.x, this.y);
    // }

    // async addNewPage() {
    //     this.doc.addPage();
    //     this.resetXandY();
    //     this.updatePointer();
    // }

    // async addImage(imageData: Buffer, options?: any) {
    //     this.doc.addImage(
    //         imageData,
    //         'JPEG',
    //         options?.x || this.x,
    //         options?.y || this.y,
    //         options?.width || this.doc.internal.pageSize.getWidth(),
    //         options?.height || this.doc.internal.pageSize.getHeight(),
    //     );

    //     this.y =
    //         options?.height || this.doc.internal.pageSize.getHeight() + this.doc.getLineHeight();
    //     this.updatePointer();
    // }

    // async addGenericTable<T>(dataArr: T[], options: TableOptions) {
    //     if (!dataArr && dataArr.length === 0) {
    //         console.warn('⚠️ Warning: Data array is empty, skipping table generation.');
    //         return;
    //     }

    //     const mergedOptions: TableOptions = {
    //         ...this.defaultTableOptions,
    //         ...options,
    //         startY: this.y + this.doc.getLineHeight(),
    //     };

    //     this.addText(`${mergedOptions.tableName}`);

    //     if (mergedOptions.addToIndex) {
    //         this.indexData.push({
    //             Index: mergedOptions.tableName,
    //             Page: this.doc.getCurrentPageInfo().pageNumber,
    //         });
    //     }

    //     const headers = Object.keys(dataArr[0]).filter(
    //         (key) => !mergedOptions.ignoreFields?.includes(key),
    //     );

    //     const transformedData = dataArr.map((item) =>
    //         headers.map((key) => (item[key] instanceof Date ? item[key].toISOString() : item[key])),
    //     );

    //     autoTable(this.doc, {
    //         head: [headers],
    //         body: transformedData,
    //         styles: { fontSize: 10, cellPadding: 3 },
    //         columnStyles: { 0: { cellWidth: 'auto' } },
    //         startY: this.y,
    //         ...mergedOptions,
    //     });

    //     this.y = (this.doc as any).lastAutoTable.finalY + this.doc.getLineHeight();
    //     this.updatePointer();
    // }

    // async addText(text: string, options?: TextOptions) {
    //     const lines = this.doc.splitTextToSize(
    //         text,
    //         this.doc.internal.pageSize.width - this.xMargin * 2,
    //     );

    //     if (options?.addToIndex) {
    //         this.indexData.push({
    //             Index: text,
    //             Page: this.doc.getCurrentPageInfo().pageNumber,
    //         });
    //     }

    //     this.doc.text(lines, options?.x || this.x, options?.y || this.y);
    //     this.y += this.doc.getTextDimensions(lines).h + this.doc.getLineHeight();
    //     this.updatePointer();
    // }

    // async addNewLine() {
    //     this.y += this.doc.getLineHeight();
    //     this.x = this.xMargin;
    //     this.updatePointer();
    // }

    // async render(res: Response) {
    //     try {
    //         await this.addPageNumbers();
    //         await this.index();

    //         res.set({
    //             'Content-Type': 'application/pdf',
    //             'Content-Disposition': 'attachment; filename=report.pdf',
    //         });

    //         res.send(Buffer.from(this.doc.output('arraybuffer')));
    //     } catch (error) {
    //         console.error('❌ Error generating PDF:', error);
    //         res.status(500).send('Error generating PDF');
    //     }
    // }

    // private async addPageNumbers() {
    //     const pageCount = (this.doc as any).internal.getNumberOfPages();
    //     for (let i = 1; i <= pageCount; i++) {
    //         this.doc.setPage(i);
    //         this.doc.setFontSize(10);
    //         this.doc.text(
    //             `Page ${i} / ${pageCount}`,
    //             this.xMargin,
    //             this.doc.internal.pageSize.height - this.yMargin / 2,
    //         );
    //     }
    // }

    // private async index() {
    //     this.doc.setPage(2);
    //     this.resetXandY();
    //     this.updatePointer();
    //     await this.addGenericTable(this.indexData, {
    //         tableName: `Table of Contents`,
    //         theme: 'grid',
    //     });
    // }

    // /** 🔹 Generate PDF using Puppeteer with an HTML Template */
    // async generatePdfWithHtml(res: Response, filename?: string) {
    //     try {
    //         const browser = await puppeteer.launch();
    //         const page = await browser.newPage();

    //         // Load HTML template

    //         await page.setContent(htmlContent);
    //         const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    //         await browser.close();

    //         res.set({
    //             'Content-Type': 'application/pdf',
    //             'Content-Disposition': `attachment; filename=${filename ?? 'report'}.pdf`,
    //         });

    //         res.send(pdfBuffer);
    //     } catch (error) {
    //         console.error('❌ Error generating PDF with Puppeteer:', error);
    //         res.status(500).send('Error generating PDF');
    //     }
    // }
}
