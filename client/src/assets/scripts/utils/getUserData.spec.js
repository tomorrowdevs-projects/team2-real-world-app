import { getUserData } from './dataManagement';

//GET USER DATA
const icon = './user-icon.png';

const userData = {
  userName: 'Domenico Cavaglieri',
  email: 'cavaglieridomenico@gmail.com',
  photo:
    'https://lh3.googleusercontent.com/a-/AOh14Gj2LbZPIR0TJNHDe3qDjsMW5UOcIJbr_F_cnWeK=s96-c',
};

const userData2 = null;

const userData3 = undefined;

const userData4 = {};

const userData5 = {
  email: 'cavaglieridomenico@gmail.com',
  photo:
    'https://lh3.googleusercontent.com/a-/AOh14Gj2LbZPIR0TJNHDe3qDjsMW5UOcIJbr_F_cnWeK=s96-c',
};

const userData6 = {
  userName: 'Domenico Cavaglieri',
  photo:
    'https://lh3.googleusercontent.com/a-/AOh14Gj2LbZPIR0TJNHDe3qDjsMW5UOcIJbr_F_cnWeK=s96-c',
};

const userData7 = {
  userName: 'Domenico Cavaglieri',
  email: 'cavaglieridomenico@gmail.com',
};

//GET USER NAME
test(`It should return user name`, () => {
  expect(getUserData(userData, 'userName')).toEqual('Domenico Cavaglieri');
  expect(getUserData(userData2, 'userName')).toEqual('');
  expect(getUserData(userData3, 'userName')).toEqual('');
  expect(getUserData(userData4, 'userName')).toEqual('');
  expect(getUserData(userData5, 'userName')).toEqual('');
});

//GET EMAIL
test(`It should return email`, () => {
  expect(getUserData(userData, 'email')).toEqual(
    'cavaglieridomenico@gmail.com'
  );
  expect(getUserData(userData2, 'email')).toEqual('');
  expect(getUserData(userData3, 'email')).toEqual('');
  expect(getUserData(userData4, 'email')).toEqual('');
  expect(getUserData(userData6, 'email')).toEqual('');
});

//GET PHOTO
test(`It should return photo url`, () => {
  expect(getUserData(userData, 'photo', icon)).toEqual(
    'https://lh3.googleusercontent.com/a-/AOh14Gj2LbZPIR0TJNHDe3qDjsMW5UOcIJbr_F_cnWeK=s96-c'
  );
  expect(getUserData(userData2, 'photo', icon)).toEqual('./user-icon.png');
  expect(getUserData(userData3, 'photo', icon)).toEqual('./user-icon.png');
  expect(getUserData(userData4, 'photo', icon)).toEqual('./user-icon.png');
  expect(getUserData(userData7, 'photo', icon)).toEqual('./user-icon.png');
});
