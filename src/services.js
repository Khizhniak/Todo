import { auth } from './firebase/config';

export const registerUser = async ({
  displayName,
  email,
  password,
  password2,
  photoURL,
}) => {
  //console.log('email, password registerUser', email, password);
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    let user = await auth.currentUser;
    user
      .updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      })
      .then(function () {
      })
      .catch(function (error) {
      });
  } catch (error) {
    console.log('message', error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    let user = auth.currentUser;
    console.log('userCurrent', user);
  } catch (error) {
    console.log('message', error);
  }
};
