const PDFDocument = require('pdfkit');

exports.generateInvoice = (res, data) => {
  const doc = new PDFDocument();
  doc.pipe(res);

  doc.text("Invoice");

  data.items.forEach(i => {
    doc.text(`${i.name} x ${i.quantity}`);
  });

  doc.text(`Total: ₹${data.total}`);
  doc.end();
};