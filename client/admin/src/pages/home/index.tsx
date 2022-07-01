import { LoginService } from '@/service/login';
import request from '@/service/request';
import { UserService } from '@/service/user';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const login = async () => {
    try {
      const { data, message } = await LoginService.login();
      enqueueSnackbar(message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  const getTest = async () => {
    try {
      const { data } = await request.get('/users/test');
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={() => login()}>
        Hello World
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          UserService.updateStatus();
        }}
      >
        修改
      </Button>
    </div>
  );
};

export default Home;
