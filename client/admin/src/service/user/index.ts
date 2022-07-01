import request from '../request';

export class UserService {
  static updateStatus() {
    return request.put('/admin/users/status', { status: 1, id: 2 });
  }
}
