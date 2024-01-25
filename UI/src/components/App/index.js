import React, { useState, useEffect } from 'react';

import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
        <Dashboard setIsAuthenticated={setIsAuthenticated}></Dashboard>
    </>
  );
};

export default App;
