import React from 'react'
import { Dialog } from 'primereact/dialog';

const ModalForm= ({children, visible, data, footer, onHide, header }) => {
  return (
    <Dialog 
      className="p-fluid" 
      visible={visible} 
      style={{ width: '32rem' }} 
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header={header}
      modal 
      footer={footer} 
      onHide={onHide}
     >
      {children}
    </Dialog>
  )
}

export default ModalForm