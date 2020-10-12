import _ from 'lodash';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const special = '!"£$%^&*()-=+_?';
const numbers = '0123456789';

function generatePassword() {
  const pickedChars = _.sampleSize(alphabet, 2)
    .concat(_.sampleSize(capitals, 2))
    .concat(_.sampleSize(numbers, 2))
    .concat(_.sampleSize(special, 2));

  const password = _.shuffle(pickedChars).join('');

  return password;
}

export default generatePassword;
