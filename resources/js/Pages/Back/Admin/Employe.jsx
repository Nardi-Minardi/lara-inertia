import React, { useState, useEffect, useRef } from 'react';
import BackLayout from '@/Layouts/BackLayout';
import { useForm, usePage, Head } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { BiSearch } from 'react-icons/bi';
import { ImSpinner2 } from 'react-icons/im';
import { TiTimes } from 'react-icons/ti';
import { BsTrash, BsPencil, BsCheck2, BsFiletypeXls, BsFiletypePdf } from 'react-icons/bs';
import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import DangerButton from '@/Components/Back/Button/DangerButton';
import ModalConfirm from '@/Components/Back/Modal/ModalConfirm';
import ModalForm from '@/Components/Back/Modal/ModalForm';
import ModalAvatar from '@/Components/Back/Modal/ModalAvatar';
import exportPdf from '@/Utils/exportPdf';
import exportExcel from '@/Utils/exportExcel';
import { APP_URL } from '../../../config.jsx'

const Employe = () => {

  let emptyDataEmploye = {
    id: null,
    name: '',
    email: '',
    avatar: null,
    description: null,
    departement_id: null,
    position: '',
    status: null,
  };

  const toast = useRef(null);
  const dt = useRef(null);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const dataEmploye = usePage().props.dataEmploye;
  const dataDepartement = usePage().props.dataDepartement;
  const [datas, setDatas] = useState(null);
  const [titleModal, setTitleModal] = useState('');
  const [modalForm, setModalForm] = useState(false);
  const [modalDeleteSelected, setModalDeleteSelected] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAvatar, setModalAvatar] = useState(false);
  const [errors, setErrors] = useState({});
  const [actionFrozen, setActionFrozen] = useState(false);
  const [statuses, setStatuses] = useState([
    { name: 'Aktif', value: 1 },
    { name: 'Non Aktif', value: 0 },
  ]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDepartement, setSelectedDepartement] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [method, setMethod] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data, setData, post, patch, delete: destroy } = useForm({
    id: null,
    name: '',
    email: '',
    avatar: null,
    description: null,
    departement_id: null,
    position: '',
    status: null,
  });

  useEffect(() => {
    setLoading(true);
    setDatas(dataEmploye);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log(actionFrozen)
  }, [actionFrozen]);


  const addData = () => {
    setTitleModal('Tambah Data');
    setMethod('post');
    setData(emptyDataEmploye);
    setSelectedDepartement(null);
    setModalForm(true);
  };

  const closemodalForm = () => {
    setModalForm(false);
    setErrors({});
  };

  const onCreateData = (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnLoading(true);

    post(route('admin.employe.store'), {
      preserveScroll: true,
      onSuccess: (res) => {
        setDatas(res.props.dataEmploye);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: res.props.success_flash,
          life: 3000
        });
        setModalForm(false);
        setLoading(false);
        setBtnLoading(false);
        setData(emptyDataEmploye);
        setSelectedDepartement(null);
        setErrors({});
      },
      onError: (error) => {
        console.log('error', error);
        setErrors(error);
        setLoading(false);
        setBtnLoading(false);
      }

    });
  };

  const onUpdateData = () => {
    setLoading(true);
    setBtnLoading(true);

    patch(route('admin.employe.update'), {
      preserveScroll: true,
      onSuccess: (res) => {
        setDatas(res.props.dataEmploye);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: res.props.success_flash,
          life: 3000
        });
        setModalForm(false);
        setLoading(false);
        setBtnLoading(false);
        setData(emptyDataEmploye);
        setSelectedDepartement(null);
        setErrors({});
      },
      onError: (error) => {
        console.log('error', error);
        setErrors(error);
        setLoading(false);
        setBtnLoading(false);
      }

    });
  };

  const modalFormFooter = (
    <React.Fragment>
      <PrimaryButton
        onClick={closemodalForm}
        bg="red">
        <TiTimes
          color='white'
          size={14}
          className="mr-2"
        />
        Cancel
      </PrimaryButton>
      <PrimaryButton
        onClick={method === 'post' ? onCreateData : onUpdateData}
      >
        {btnLoading ? (
          <ImSpinner2 className="mr-2" color="white" size={14} />
        ) : (
          <BsCheck2
            color='white'
            size={14}
            className="mr-2"
          />
        )}
        {method === 'post' ? 'Create' : 'Update'}
      </PrimaryButton>
    </React.Fragment>
  );

  const editData = (data) => {
    setImagePreview(null)
    setTitleModal('Edit Data');
    setMethod('patch');
    setData({ ...data });
    dataDepartement.filter((item) => {
      if (item.name === data.departement) {
        let _departement = [];
        _departement.push(item)
        setSelectedDepartement(_departement[0]);
        setData({ ...data, departement_id: _departement[0].id });
      }
    })
    statuses.find((item) => {
      if (item.value === data.status) {
        setSelectedStatus(item);
      }
    })

    setModalForm(true);
  };

  const onDropdownChange = (e) => {
    let _data = { ...data };
    setSelectedDepartement(e.value);
    _data['departement_id'] = e.value.id
    setData(_data);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _data = { ...data };

    _data[`${name}`] = val;

    setData(_data);
  };

  const onImageChange = (e) => {
    const val = (e.target && e.target.files[0]) || '';
    let _data = { ...data };

    _data['avatar'] = val;
    console.log('file', val);
    // if val notimage
    if (val.type !== 'image/jpeg' && val.type !== 'image/png') {
      alert('File harus berupa gambar');
      return false;
    }
    let reader = new FileReader();
    var url = reader.readAsDataURL(val);
    reader.onloadend = function (e) {
      setImagePreview([reader.result]);
    }.bind(this);

    setData(_data);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <a className="
        relative 
        inline-block
        h-16 w-16
        group"
        href="##"
      >
        <img
          src={`${APP_URL}/images/${rowData.avatar}`}
          alt={rowData.avatar}
          className=" h-16 w-16"
        />
        <div className="relative">
          <div
            className="
            transition-all transform 
            translate-y-8 opacity-0 
            group-hover:opacity-100 
            group-hover:translate-y-0"
          >
            <button
              className="
            px-3 
            py-1 
            text-sm rounded-sm
          text-white 
          bg-yellow-600"
              onClick={() => {
                setData(rowData)
                setModalAvatar(true)
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </a>
    )
    //                       <img
    // src={`http://127.0.0.1:8000/images/${rowData.avatar}`}
    // alt={rowData.avatar}
    // className=" h-16 w-16"

    // onClick={() => alert('tes')}
    // />;
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.status === 0) return <Tag value="Non Aktif" severity="danger" />;
    else if (rowData.status === 1) return <Tag value="Aktif" severity="success" />;
    else return <Tag value="Tidak Diketahui" severity="warning" />;
  };


  const actionColumn = (rowData) => {
    return (
      <div className="flex flex-row gap-2 align-items-center">
        <PrimaryButton
          onClick={() => editData(rowData)}
          bg="blue">
          <BsPencil
            color='white'
            size={14}
          />
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            setData(rowData);
            setModalDelete(true);
          }}
          bg="red">
          <BsTrash
            color='white'
            size={14}
          />
        </PrimaryButton>
      </div>
    );
  };

  const deleteEmploye = () => {
    setLoading(true);
    let _datas = datas.filter((val) => val.id !== data.id);
    const id = data.id;
    destroy(route(`admin.employe.destroy`, { id }), {
      preserveScroll: true,
      onSuccess: (res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: res.props.success_flash,
          life: 3000
        });
        setLoading(false);
        setDatas(_datas);
        setModalDelete(false);
        setData(emptyDataEmploye);
      },
      onError: (error) => {
        console.log('error', error);
      }

    });
  };

  const modalDeleteFooter = (
    <React.Fragment>
      <PrimaryButton
        onClick={() => setModalDelete(false)}
        bg="red">
        <TiTimes
          color='white'
          size={14}
          className="mr-2"
        />
        Cancel
      </PrimaryButton>
      <PrimaryButton
        onClick={deleteEmploye}
      >
        <BsCheck2
          color='white'
          size={14}
          className="mr-2"
        />
        Yes
      </PrimaryButton>
    </React.Fragment>
  );

  const deleteSelectedEmploye = () => {
    setLoading(true);
    let _datas = datas.filter((val) => !selectedData.includes(val));
    console.log(selectedData)
    const id = selectedData.map((item) => item.id);
    destroy(route(`admin.employe.destroy`, { id }), {
      preserveScroll: true,
      onSuccess: (res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: res.props.success_flash,
          life: 3000
        });
        setLoading(false);
        setDatas(_datas);
        setModalDeleteSelected(false);
        setSelectedData(null);
      },
      onError: (error) => {
        console.log('error', error);
      }

    });

  };

  const modalDeleteSelectedFooter = (
    <React.Fragment>
      <PrimaryButton
        onClick={() => setModalDeleteSelected(false)}
        bg="red">
        <TiTimes
          color='white'
          size={14}
          className="mr-2"
        />
        Cancel
      </PrimaryButton>
      <PrimaryButton
        onClick={deleteSelectedEmploye}
      >
        <BsCheck2
          color='white'
          size={14}
          className="mr-2"
        />
        Yes
      </PrimaryButton>
    </React.Fragment>
  );

  const colsExport = [
    { field: 'id', header: 'Employe Id' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'position', header: 'Position' },
    { field: 'departement', header: 'Departement' },
    { field: 'status', header: 'Status' }
  ];

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-between">
      <ToggleButton className='h-9' checked={actionFrozen} onChange={(e) => setActionFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Action" offLabel="Action" />
      <span className="p-input-icon-left">
        <BiSearch />
        <InputText type="search" className='h-9 float' onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  // if(loading) return <LoadingScreen />


  return (
    <BackLayout>
      <Head title="Employe" />
      <div>
        <Toast ref={toast} />
        <div className="pt-6">
          <div className="flex items-center justify-between mb-5">
            <div className='flex flex-wrap gap-2'>
              <PrimaryButton onClick={addData} >Add New</PrimaryButton>
              <DangerButton onClick={() => setModalDeleteSelected(true)} disabled={!selectedData || !selectedData.length} >Delete</DangerButton>
            </div>
            <div className="flex align-items-center justify-content-end gap-2 h-8">
              <Button severity="success" onClick={() => exportExcel(colsExport, datas)} outlined>
                <BsFiletypeXls size={18} />

              </Button>
              <Button severity="danger" onClick={() => exportPdf(colsExport, datas)} outlined>
                <BsFiletypePdf size={18} />

              </Button>
            </div>
          </div>


          <DataTable
            scrollable
            ref={dt}
            value={datas}
            selection={selectedData}
            onSelectionChange={(e) => setSelectedData(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[10, 100, 500, 1000]}
            globalFilter={globalFilter}
            header={header}
            loading={loading}
            size="small"
          >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column field="id" header="Employe Id" sortable></Column>
            <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="position" header="Position" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="departement" header="Department" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="avatar" header="Avatar" body={imageBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
            <Column body={actionColumn} header="Action" alignFrozen="right" frozen={actionFrozen}></Column>
          </DataTable>
        </div>

        <ModalForm
          visible={modalForm}
          style={{ width: '32rem' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          header={titleModal}
          modal
          className="p-fluid"
          footer={modalFormFooter}
          onHide={closemodalForm}
        >
          {data.avatar &&
            <img src={imagePreview}
              alt={imagePreview}
              className="product-image block m-auto pb-3"
            />}
          <div className="mb-4">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <InputText id="name" value={data.name} onChange={(e) => onInputChange(e, 'name')} autoFocus className={`p-inputtext-sm`} />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <InputText id="email" value={data.email} onChange={(e) => onInputChange(e, 'email')} className={`p-inputtext-sm`} />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="font-bold">
              Position
            </label>
            <InputText id="position" value={data.position} onChange={(e) => onInputChange(e, 'position')} className={`p-inputtext-sm`} />
            {errors.position && <small className="p-error">{errors.position}</small>}
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="font-bold">
              Position
            </label>
            <Dropdown
              value={selectedDepartement}
              // defaultValue={selectedDepartement}
              onChange={onDropdownChange}
              options={dataDepartement}
              name="departement_id"
              optionLabel="name"
              placeholder="Select a Departement"
              filter
              className="w-full items-center p-inputtext-sm md:w-14rem" />
            {errors.departement_id && <small className="p-error">{errors.departement_id}</small>}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="font-bold">
              Status
            </label>
            <div className="flex flex-column gap-3">
              {statuses.map((status, idx) => {
                return (
                  <div key={idx} className="flex align-items-center">
                    <RadioButton
                      inputId={status.value}
                      name="status"
                      value={status}
                      onChange={(e) =>
                        setData('status', e.value.value)
                      }
                      checked={data.status === status.value}
                    />
                    <label htmlFor={status.value} className="ml-2">{status.name}</label>
                  </div>
                );
              })}
            </div>
            {errors.status && <small className="p-error">{errors.status}</small>}
          </div>
          {method === 'post' && (
            <div className="mb-4">
              <label htmlFor="avatar" className="font-bold">
                Avatar
              </label><br></br>
              <input type="file" id='avatar' name='avatar' onChange={onImageChange} className="p-inputtext-sm" /><br></br>
              {errors.avatar && <small className="p-error">{errors.avatar}</small>}
            </div>
          )}
        </ModalForm>

        <ModalAvatar
          visible={modalAvatar}
          data={data}
          onHide={() => setModalAvatar(false)}
          submitUrl={'admin.user.avatar'}
          errors={errors}
          userId={data.user_id}
          setModalAvatar={setModalAvatar}
        />


        <ModalConfirm
          visible={modalDelete}
          data={data}
          footer={modalDeleteFooter}
          onHide={() => setModalDelete(false)}
        />

        <ModalConfirm
          visible={modalDeleteSelected}
          data={data}
          footer={modalDeleteSelectedFooter}
          onHide={() => setModalDeleteSelected(false)}
        />
      </div>
    </BackLayout>
  );
}

export default Employe