import {
  db
} from '../firebase/config';
import card from '../templates/card.hbs';
import form from '../templates/form.hbs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const cardsDraw = async object => {
  await db.collection('cards').add({
    title: object.title,
    description: object.description,
    deadline: object.deadline
  });
};

const refs = {
  addCard: document.querySelector('.addCard')
}

export const mainAccount = (MainNickName) => {


  refs.addCard.innerHTML = form();

  const makeForm = refs.addCard.querySelector('form');

  makeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const cards = {};

    formData.forEach((value, name) => (cards[name] = value));

    cardsDraw(cards);

    e.target.reset();

    Swal.fire(
      'Complete!',
      `You have added card!`,
      'success')
  });


  const currentCards = async () => {

    await db
      .collection('cards')
      .onSnapshot(Snapshot => {
        const arr = Snapshot.docs.map(note => ({
          ...note.data(),
          id: note.id,
        }));

        //Я хотел здесь сделать референс, но половина с ними не работала.

        document.querySelector('.cardsContainer').innerHTML = card(arr);

        const clickTodo = e => {

          if (e.target.className == 'delete') {
            return
          }
          for (let elem of arr) {
            if (elem.id === e.target.closest('li').id) {
              document.querySelector('.lightbox__content').innerHTML =
                `<h2 class="lightbox_title">${elem.title}</h2>
              <p class="lightbox_description">${elem.description}</p>
              <p class="lightbox_deadline">Do before ${elem.deadline}</p>`
            }
          }

          document.querySelector('.lightbox').classList.add('is-open');

        }

        document.querySelector('.cardsContainer').addEventListener('click', clickTodo);

        const closeFunc = e => {
          document.querySelector('.lightbox').classList.remove('is-open');
        }
        document.querySelector('.lightbox__button').addEventListener('click', closeFunc);
        document.querySelector('.lightbox__overlay').addEventListener('click', closeFunc);
      });
  };


  currentCards();

  return `<div class="main">
  <div class="account">
    <h1 class="account_name">${MainNickName}</h1>
    <button class='signout'>Signout</button>
  </div>
    <div class='cardsContainer'></div>
  </div>`;
};



const deleteFunc = e => {
  if (e.target.textContent !== 'Delete') {
    return;
  } else {
    db.collection('cards').doc(e.target.closest('li').id).delete();
    Swal.fire(
      'Complete!',
      'You deleted the task!',
      'success')
  }
};

document.querySelector('.accountContainer').addEventListener('click', deleteFunc);
