import React from 'react'
import { Dialog } from 'primereact/dialog';

const ModalConfirm = ({ visible, data, footer, onHide }) => {
  return (
    <Dialog visible={visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={footer} onHide={onHide}>
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        {data ? (
          <span>
            Are you sure you want to delete <b>{data.name}</b>?
          </span>
        ) : (
          <span>Are you sure you want to delete the selected data?</span>
        )}
      </div>
    </Dialog>
  )
}

export default ModalConfirm