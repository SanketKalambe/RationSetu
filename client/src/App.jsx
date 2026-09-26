import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import AppRoutes from './routes/AppRoutes';
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {user && <Sidebar />}
        <main className={`flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto ${user ? 'pb-20 md:pb-8' : ''}`}>
          <AppRoutes />
        </main>
      </div>
      {user && <MobileBottomNav />}
    </div>
  );
};

export default App;
