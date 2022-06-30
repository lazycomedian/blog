import { LoginService } from '@/service/login';
import request from '@/service/request';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const login = () => {
    LoginService.login();
  };

  useEffect(() => {
    request.get('/users/test');
  }, []);

  return (
    <div>
      <form action="/login" method="post">
        用户名:
        <input type="text" />
        密码: <input type="text" />
        <button type="submit">登陆</button>
      </form>
    </div>
  );
};

export default Home;
