import useAppContext from '../../context/appContext';
import { confirmModal } from '../../utils/confirmModal';
import { useQuery } from 'react-query';
import axios from '../../config/axios';
import { useEffect, useState } from 'react';
import alert from '../../utils/alert';

const fetchBills = async () => {
  const { data } = await axios.get('/billing-list');

  return data;
};

export const Table = () => {
  const [edit, setEdit] = useState({
    editMode: false,
    bill: {},
  });

  const { savingBill, bill, bills, formBillData, dispatch, updated } = useAppContext();
  const { data, refetch, isLoading } = useQuery(['bills', updated], fetchBills);

  const handleDelete = async (billId) => {
    const res = await confirmModal('Are you sure you want to delete?', 'Yes', 'No, Cancel');

    if (res.isConfirmed) {
      const res = await axios.delete(`/delete-billing/${billId}`);

      if (res.status === 200) {
        alert('success', 'Deleted successfully');
        refetch();
      }
    }
  };

  const handleEdit = async (bill) => {
    setEdit({
      ...edit,
      editMode: true,
      bill,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_BILLS', payload: data });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (edit.editMode) {
      dispatch({ type: 'EDIT_BILL', payload: edit.bill });
      document.querySelector('#modal').checked = true;
    }

    // setEdit({ ...edit, editMode: false });
  }, [edit, dispatch]);

  if (isLoading) {
    return <p className="text-center text-3xl font-bold">Loading...</p>;
  }

  return (
    <section className="w-full max-w-7xl mx-auto my-5">
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savingBill && (
              <tr>
                <th>{savingBill ? 'Generating bil...' : bill?._id}</th>
                <td>{savingBill ? formBillData?.name : bill ? bill?.name : null}</td>
                <td>{savingBill ? formBillData?.email : bill ? bill?.email : null}</td>
                <td>{savingBill ? formBillData?.phone : bill ? bill?.phone : null}</td>
                <td>{savingBill ? formBillData?.amount : bill ? bill?.amount : null}</td>
                <td className="flex gap-1 items-center">
                  <button className="btn btn-sm">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            )}
            {bills?.map((bill) => (
              <tr key={bill._id}>
                <th>{bill._id}</th>
                <td>{bill.name}</td>
                <td>{bill.email}</td>
                <td>{bill.phone}</td>
                <td>{bill.amount}</td>
                <td className="flex gap-1 items-center">
                  <button className="btn btn-sm" onClick={() => handleEdit(bill)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(bill._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
