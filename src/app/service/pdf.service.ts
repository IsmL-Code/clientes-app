// pdf.service.ts
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;
  }

  generatePdf(users: any[]) {
    const documentDefinition = {
      content: [
        { text: 'Reporte Usuarios', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              ['Id', 'Nombre', 'Email', 'telefono'],
              ...users.map(user => [
                user.id,
                user.name,
                user.email,
                user.phone
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('user-list.pdf');
  }
}