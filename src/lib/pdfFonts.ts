import { jsPDF } from "jspdf";
import { robotoRegular, robotoBold } from "./fonts/roboto";

export function registerFonts(doc: jsPDF) {
  doc.addFileToVFS("Roboto-Regular.ttf", robotoRegular);
  doc.addFileToVFS("Roboto-Bold.ttf", robotoBold);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  doc.setFont("Roboto");
}
