import request from '../request';

export abstract class LoginService {
  static login() {
    return request.post('/login', { username: 'user', password: 'e4f880f4-4670-4cd4-8030-7daff76ecb84' });
  }
}
