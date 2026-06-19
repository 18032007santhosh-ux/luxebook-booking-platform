import { jsPDF } from "jspdf";

export const generateReceiptPDF = async (booking) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
  // Set default colors
  const primaryColor = "#0F5E4D"; // Emerald green
  const goldColor = "#D4AF37";
  const textColor = "#121212";
  const lightGray = "#E0E0E0";

  // Branding
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("LuxeBook", 105, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Elevating Private Concierge Services", 105, 28, { align: "center" });

  // Receipt Header
  doc.setTextColor(textColor);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING RECEIPT", 20, 60);
  
  // Booking Reference
  const bookingId = booking?.bookingId || "LB-XXXXX";
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#555555");
  doc.text(`Reference ID: ${bookingId}`, 20, 68);

  // Line separator
  doc.setDrawColor(goldColor);
  doc.setLineWidth(0.5);
  doc.line(20, 75, 190, 75);

  // Layout Setup
  const leftColX = 20;
  const rightColX = 120;
  let currentY = 85;

  // Booking Information
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor);
  doc.text("Booking Details", leftColX, currentY);
  
  currentY += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor);
  doc.text(`Status: Confirmed`, leftColX, currentY);
  currentY += 6;
  doc.text(`Date: ${booking?.date || "Not Available"}`, leftColX, currentY);
  currentY += 6;
  doc.text(`Time: ${booking?.time || "Not Available"}`, leftColX, currentY);
  currentY += 6;
  doc.text(`Duration: ${booking?.duration || "Not Available"}`, leftColX, currentY);

  // Guest Information
  let rightY = 85;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor);
  doc.text("Guest Details", rightColX, rightY);
  
  rightY += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor);
  doc.text(`Name: ${booking?.customerName || "Not Available"}`, rightColX, rightY);
  rightY += 6;
  doc.text(`Email: ${booking?.customerEmail || "Not Available"}`, rightColX, rightY);

  currentY = Math.max(currentY, rightY) + 15;

  // Service Details
  doc.setDrawColor(lightGray);
  doc.setLineWidth(0.2);
  doc.line(20, currentY, 190, currentY);
  currentY += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor);
  doc.text("Service Overview", 20, currentY);

  currentY += 10;
  // Table Header
  doc.setFillColor("#F8F5F0");
  doc.rect(20, currentY, 170, 10, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Description", 25, currentY + 7);
  doc.text("Amount", 185, currentY + 7, { align: "right" });

  currentY += 16;
  // Table Content
  doc.setFont("helvetica", "normal");
  doc.text(booking?.serviceName || "Luxury Treatment", 25, currentY);
  
  const basePrice = booking?.price || 350;
  const tax = 30; // Mocked tax like in checkout
  const total = basePrice + tax;

  doc.text(`$${basePrice.toFixed(2)}`, 185, currentY, { align: "right" });
  
  currentY += 8;
  doc.setFontSize(9);
  doc.setTextColor("#777777");
  doc.text(`Practitioner: ${booking?.practitioner || "Elite Practitioner"}`, 25, currentY);

  currentY += 15;
  doc.setDrawColor(lightGray);
  doc.line(120, currentY, 190, currentY);
  
  currentY += 8;
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.text("Base Price:", 120, currentY);
  doc.text(`$${basePrice.toFixed(2)}`, 185, currentY, { align: "right" });
  
  currentY += 6;
  doc.text("Concierge Tax:", 120, currentY);
  doc.text(`$${tax.toFixed(2)}`, 185, currentY, { align: "right" });

  currentY += 6;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor);
  doc.text("Total Paid:", 120, currentY);
  doc.text(`$${total.toFixed(2)}`, 185, currentY, { align: "right" });

  // QR Code Generation
  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}&color=0F5E4D`;
    const qrResponse = await fetch(qrUrl);
    const blob = await qrResponse.blob();
    const base64data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    if (base64data) {
      doc.addImage(base64data, "PNG", 20, 220, 30, 30);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#777777");
      doc.text("Digital Pass", 35, 255, { align: "center" });
    }
  } catch (error) {
    console.warn("Could not load QR code for PDF", error);
  }

  // Footer
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor("#777777");
  doc.text("Thank you for choosing LuxeBook.", 105, 280, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text("Contact Support: concierge@luxebook.com | www.luxebook.com", 105, 285, { align: "center" });

  // Download the PDF
  doc.save(`LuxeBook_Receipt_${bookingId}.pdf`);
};
