
export default function exportPdf(columns, datas) {
  const exportColumns = 
    columns.map((col) => {
      return { title: col.header, dataKey: col.field }
  })

  import('jspdf').then((jsPDF) => {
    import('jspdf-autotable').then(() => {
      const doc = new jsPDF.default(0, 0);
          doc.autoTable(exportColumns, datas, {
            theme: 'grid',
            styles: {
              overflow: 'linebreak',
              fontSize: 8,
              cellPadding: 0.5,
              rowPageBreak: 'auto',
              halign: 'center',
              valign: 'middle'
            },
            columnStyles: {
              id: { halign: 'center' },
              name: { halign: 'center' },
              email: { halign: 'center' },
              position: { halign: 'center' },
              departement: { halign: 'center' },
              status: { halign: 'center' }
            },
            margin: { top: 20 },
            didDrawPage: (data) => {
              doc.text('Data Employe', 14, 15);
            },
            didParseCell: (data) => {
              if (data.cell.raw === 0) {
                data.cell.text = 'Non Aktif';
              } else if (data.cell.raw === 1) {
                data.cell.text = 'Aktif';
              }
            }
          });

          doc.save('data-employe.pdf');
      });
  });
}