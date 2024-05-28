import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (data, type) => {
  try {
    let url =
      type === 'password'
        ? 'http://127.0.0.1:5000/api/v1/users/updatePassword'
        : 'http://127.0.0.1:5000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
    location.reload(true);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
