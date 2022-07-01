import { SnackbarProvider } from 'notistack';
import React from 'react';
import BasicRouter from './router';

const App: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <BasicRouter />
    </SnackbarProvider>
  );
};

export default App;
