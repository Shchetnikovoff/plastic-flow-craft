import { Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, AlignmentType, TabStopPosition, TabStopType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

async function loadImageAsArrayBuffer(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob.arrayBuffer();
}

export async function generateLetterhead() {
  const logoBuffer = await loadImageAsArrayBuffer("/images/logo.png");

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1200,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new ImageRun({
                    data: logoBuffer,
                    transformation: { width: 100, height: 46 },
                    type: "png",
                  }),
                ],
              }),
              new Paragraph({
                border: {
                  bottom: {
                    color: "1E3A5F",
                    space: 4,
                    style: BorderStyle.SINGLE,
                    size: 6,
                  },
                },
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: "ООО СЗПК «Пласт-Металл Про»",
                    bold: true,
                    size: 20,
                    color: "1E3A5F",
                    font: "Arial",
                  }),
                  new TextRun({
                    text: "\t",
                  }),
                  new TextRun({
                    text: "+7 963 322-55-40  |  osobenkov@list.ru",
                    size: 16,
                    color: "666666",
                    font: "Arial",
                  }),
                ],
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                  },
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: {
                  top: {
                    color: "1E3A5F",
                    space: 4,
                    style: BorderStyle.SINGLE,
                    size: 6,
                  },
                },
                spacing: { before: 100 },
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "ООО СЗПК «Пласт-Металл Про»  |  ИНН: 7806634460  |  Ленинградская обл., д. Разметелево, ул. Строителей 27",
                    size: 14,
                    color: "999999",
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Тел.: +7 963 322-55-40  |  E-mail: osobenkov@list.ru",
                    size: 14,
                    color: "999999",
                    font: "Arial",
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 400 },
            children: [
              new TextRun({
                text: "КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ",
                bold: true,
                size: 32,
                color: "1E3A5F",
                font: "Arial",
              }),
            ],
          }),
          // Date line
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Дата: ",
                bold: true,
                size: 22,
                color: "333333",
                font: "Arial",
              }),
              new TextRun({
                text: "[укажите дату]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
              new TextRun({ text: "\t" }),
              new TextRun({
                text: "№ ",
                bold: true,
                size: 22,
                color: "333333",
                font: "Arial",
              }),
              new TextRun({
                text: "[номер]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
            ],
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
          }),
          // Recipient
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "Кому: ",
                bold: true,
                size: 22,
                color: "333333",
                font: "Arial",
              }),
              new TextRun({
                text: "[ФИО получателя]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "Организация: ",
                bold: true,
                size: 22,
                color: "333333",
                font: "Arial",
              }),
              new TextRun({
                text: "[название организации]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
            ],
          }),
          // Greeting
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Уважаемый(ая) ",
                size: 22,
                color: "333333",
                font: "Arial",
              }),
              new TextRun({
                text: "[имя отчество]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
              new TextRun({
                text: "!",
                size: 22,
                color: "333333",
                font: "Arial",
              }),
            ],
          }),
          // Body
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "ООО СЗПК «Пласт-Металл Про» предлагает Вашему вниманию следующую продукцию:",
                size: 22,
                color: "333333",
                font: "Arial",
              }),
            ],
          }),
          // Editable content area
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "[Введите описание продукции, условия поставки, цены и сроки]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
            ],
          }),
          // Empty paragraphs for spacing
          ...Array.from({ length: 8 }, () =>
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "",
                  size: 22,
                  font: "Arial",
                }),
              ],
            })
          ),
          // Signature block
          new Paragraph({
            spacing: { before: 400, after: 100 },
            children: [
              new TextRun({
                text: "С уважением,",
                size: 22,
                color: "333333",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "Директор ООО СЗПК «Пласт-Металл Про»",
                size: 22,
                color: "333333",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "[подпись]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
              new TextRun({
                text: " / ",
                size: 22,
                color: "999999",
                font: "Arial",
              }),
              new TextRun({
                text: "[расшифровка]",
                size: 22,
                color: "AAAAAA",
                font: "Arial",
                italics: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Коммерческое_предложение_ПластМеталлПро.docx");
}
