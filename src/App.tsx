import React from 'react';
import { ThemeProvider } from './hooks/ThemeContext';
import RegistrationForm from './components/RegistrationForm';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RegistrationForm />
    </ThemeProvider>
  );
};

export default App;