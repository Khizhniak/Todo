import login from '../templates/log.hbs';
import register from '../templates/reg.hbs';
import {
  registerUser,
  loginUser
} from '../services';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const createAccount = () => {
  const authContainer = document
    .querySelector('.accountContainer2')
    .querySelector('.authContainer');

  authContainer.innerHTML = login();

  const formChange = e => {
    if (e.target.dataset.action === 'go-reg') {
      authContainer.innerHTML = register();
      valueFromForm();

    } else if (e.target.dataset.action === 'go-log') {
      authContainer.innerHTML = login();
      valueFromForm();
    }
  };

  authContainer.addEventListener('click', formChange);

  authContainer.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};
    formData.forEach((value, name) => (user[name] = value));
    loginUser(user)
  });

  const valueFromForm = () => {
    document
      .querySelector('.accountContainer2')
      .querySelector('.authContainer')
      .querySelector('form')
      .addEventListener('submit', e => {
        e.preventDefault();

        if (document.querySelector('.go-change').dataset.action === "go-log") {
          const formData = new FormData(e.target);
          const user = {};
          formData.forEach((value, name) => (user[name] = value));
          if (user.password === user.passwordConfirm) {
            registerUser(user)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Confirming password is incorrect',
              text: `Password and confirming password don't match`,
            })
          }
        } else if (document.querySelector('.go-change').dataset.action === "go-reg") {
          const formData = new FormData(e.target);
          const user = {};
          formData.forEach((value, name) => (user[name] = value));
          loginUser(user)
        }
      });
  };
};
