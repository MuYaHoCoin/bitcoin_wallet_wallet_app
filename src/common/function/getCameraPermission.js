import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export default async () => {
  try {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    if (result === RESULTS.GRANTED) {
      console.log('ok');
    }
  } catch (error) {
    console.log('catch error');
  }
};
