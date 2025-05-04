import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store/index';
import { Routes } from './routes/index';
import { Spinner } from '@components/common/Spinner';
import { setupInterceptors } from '@utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@assets/styles/index.css';

// Initialize API interceptors
setupInterceptors();

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner size="lg" />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes />
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;