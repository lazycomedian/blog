import request from '../request';

export class LoginService {
  static login() {
    const param = new URLSearchParams({
      username: 'admin',
      password: 'admin888',
    });

    return request.post('/login', param);
  }
}
