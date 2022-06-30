import MySwal from '../config/sweetAlert';

const alert = (icon, title) => {
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', MySwal.stopTimer);
      toast.addEventListener('mouseleave', MySwal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
};

export default alert;
