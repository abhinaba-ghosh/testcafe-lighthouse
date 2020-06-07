import { cafeLighthouse } from '../index';

fixture(`Audit Test`).page('https://angular.io/');

test('user page performance', async () => {
  console.log('test started');

  await cafeLighthouse();
  console.log('test ended');
});
