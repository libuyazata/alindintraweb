// import { Injectable } from '@angular/core';
// import * as XLSX from 'xlsx';
// import { Workbook } from 'exceljs';
// import * as fs from 'file-saver';
// import * as logoFile from './logo';
// import { DatePipe }  from '@angular/common';

// //@Injectable({providedIn: 'root'})
// @Injectable()
// export class ExcelService {

//   private isMocking = true;

//   constructor() {

//   }

//   generateExcel(dataInfo:any = null) {
//     //Excel Title, Header, Data
    
//     let header;
//     let data;
//     if(this.isMocking) {
//       dataInfo = this.getDemoData();
//       header = dataInfo.header;
//       data = dataInfo.rows;
//     } else if(dataInfo) {
//       header = dataInfo.header;
//       data = dataInfo.rows;
//     }

//     if(dataInfo) {
//       //Create workbook and worksheet
      
//       let workbook = new Workbook();
//       let worksheet = workbook.addWorksheet(dataInfo.sheetTitle);

//       //Add Row and formatting
//       worksheet.mergeCells('C1:E2');
//       worksheet.getCell('C1').value = dataInfo.title;
//       worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
//       worksheet.getCell('C1').font = { name: 'Calibri', family: 4, size: 18, bold: true }
//       worksheet.getCell('A1').border = { right: {style:'thin', color: {argb:'FFFFFF'}} };

//       // let subTitleRow = "Sub Title" ; // worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])


//       //Add Image
//       let logo = workbook.addImage({
//         base64: logoFile.logoBase64,
//         extension: 'png',
//       });
     

//       // worksheet.addImage(logo, {
//       //   tl: { col: 0, row: 0 },
//       //   ext: { width: 350, height: 35 }
//       // });
//       worksheet.addImage(logo, 'A2:A2');
//       worksheet.mergeCells('A1:B2');

//       //Blank Row 
//       worksheet.addRow([]);

//       //Add Header Row
//       let headerRow = worksheet.addRow(header);
      
//       // Cell Style : Fill and Border
//       headerRow.eachCell((cell, number) => {
//         cell.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: '095BBF' },
//           bgColor: { argb: 'FFFFFF' }
//         }
//         cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
//       })
//       headerRow.font = {color: {argb: "FFFFFF"}};
//       // worksheet.addRows(data);


//       // Add Data and Conditional Formatting
//       data.forEach((d:any) => {
//         let row = worksheet.addRow(d);
//       });
//       worksheet.getColumn(2).width = 30;
//       worksheet.getColumn(3).width = (dataInfo.title == "Employee View List") ? 60 : 30;
//       worksheet.getColumn(4).width = 30;
//       worksheet.getColumn(5).width = 30;
//       worksheet.getColumn(6).width = 30;
//       worksheet.getColumn(7).width = 20;
//       worksheet.addRow([]);


//       //Footer Row
//       let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
//       footerRow.getCell(1).fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'ECECEC' }
//       };
//       footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

//       //Merge Cells
//       worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

//       //Generate Excel File with given name
//       workbook.xlsx.writeBuffer().then((data:any) => {
//         let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         // fs.saveAs(blob, dataInfo.fileName);
//       });
//     }

//   }

//   private getDemoData(){
//     return {
//       "title" : "Demo Title",
//       "fileName" : "DemoData.xlsx",
//       "sheetTitle" : "Demo Data",
//       "header" : ["Year", "Month", "Make", "Model", "Quantity", "Pct"],
//       "rows" : [
//         [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
//         [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
//         [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
//         [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
//         [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
//         [2007, 1, "Peugeot ", "Peugeot 307", 481, 3.8],
//         [2008, 1, "Toyota ", "Toyota Prius", 217, 2.2],
//         [2008, 1, "Skoda ", "Skoda Octavia", 216, 2.2],
//         [2008, 1, "Peugeot ", "Peugeot 308", 135, 1.4],
//         [2008, 2, "Ford ", "Ford Mondeo", 624, 5.9],
//         [2008, 2, "Volkswagen ", "Volkswagen Passat", 551, 5.2],
//         [2008, 2, "Volkswagen ", "Volkswagen Golf", 488, 4.6],
//         [2008, 2, "Volvo ", "Volvo V70", 392, 3.7],
//         [2008, 2, "Toyota ", "Toyota Auris", 342, 3.2],
//         [2008, 2, "Volkswagen ", "Volkswagen Tiguan", 340, 3.2],
//         [2008, 2, "Toyota ", "Toyota Avensis", 315, 3],
//         [2008, 2, "Nissan ", "Nissan Qashqai", 272, 2.6],
//         [2008, 2, "Nissan ", "Nissan X-Trail", 271, 2.6],
//         [2008, 2, "Mitsubishi ", "Mitsubishi Outlander", 257, 2.4],
//         [2008, 2, "Toyota ", "Toyota Rav4", 250, 2.4],
//         [2008, 2, "Ford ", "Ford Focus", 235, 2.2],
//         [2008, 2, "Skoda ", "Skoda Octavia", 225, 2.1],
//         [2008, 2, "Toyota ", "Toyota Yaris", 222, 2.1],
//         [2008, 2, "Honda ", "Honda CR-V", 219, 2.1],
//         [2008, 2, "Audi ", "Audi A4", 200, 1.9],
//         [2008, 2, "BMW ", "BMW 3-serie", 184, 1.7],
//         [2008, 2, "Toyota ", "Toyota Prius", 165, 1.6],
//         [2008, 2, "Peugeot ", "Peugeot 207", 144, 1.4]
//       ]
//     }
//   }
// }