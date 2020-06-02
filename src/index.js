import { auth } from './firebase/config';
import { createAccount } from './pages/auth';
import { mainAccount } from './pages/main';
import './styles.css';
// import login from './templates/log.hbs'
// import register from './templates/reg.hbs'
// import { relativeTimeRounding } from 'moment';

const refs = {
  accountContainer: document.querySelector('.accountContainer'),
};

const signOut = () => {
  auth.signOut();
  document.querySelector('.accountContainer2').style.display = 'block';
  window.location.reload();
};

const authStateChange = async () => {
  await auth.onAuthStateChanged(user => {
    if (user) {
      refs.accountContainer.innerHTML = mainAccount(
        user.displayName,
        user.photoURL,
      );
      document.querySelector('.addCard').classList.remove('hidden');
      document.querySelector('.accountContainer2').style.display = 'none';
    } else {
      createAccount();
      document.querySelector('.addCard').classList.add('hidden');
    }

    const btn = document.querySelector('.signout');
    if (btn) {
      btn.addEventListener('click', signOut);
    }
  });
};

authStateChange();
