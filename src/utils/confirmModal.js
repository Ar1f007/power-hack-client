import MySwal from '../config/sweetAlert';

export const confirmModal = async (warningText, confirmButtonText, cancelButtonText) => {
  const res = await MySwal.fire({
    title: 'Are you sure?',
    text: warningText,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });

  return res;
};
