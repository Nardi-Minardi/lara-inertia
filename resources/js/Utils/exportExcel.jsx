const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then((FileSaver) => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
};

export default function exportExcel(columns, datas) {
  columns.forEach((col) => {
    if (col.field === 'status') {
      datas.forEach((data) => {
        if (data.status === 0) {
          data.status = 'Non Aktif';
        } else if (data.status === 1) {
          data.status = 'Aktif';
        }
      });
    }
  }
  );
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(datas.map((data) => {
      return {
        'Employe Id': data.id,
        'Name': data.name,
        'Email': data.email,
        'Position': data.position,
        'Departement': data.departement,
        'Status': data.status
      };
    }));
    const workbook = { Sheets: { 'data-employe': worksheet }, SheetNames: ['data-employe'] };
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAsExcelFile(excelBuffer, 'data-employe');
  }
  );
}