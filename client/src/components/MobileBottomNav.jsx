import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  History, 
  Terminal, 
  Boxes, 
  UserCheck, 
  Sliders 
} from 'lucide-react';

const MobileBottomNav = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) return null;

  const role = user.role;

  const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/verification-queue', label: 'KYC Queue', icon: UserCheck },
    { to: '/admin/stock-allocation', label: 'Stock', icon: Boxes },
    { to: '/admin/complaints', label: 'Grievances', icon: MessageSquare }
  ];

  const distributorLinks = [
    { to: '/distributor', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/distributor/epos', label: 'e-POS', icon: Terminal },
    { to: '/distributor/stock', label: 'Inventory', icon: Boxes },
    { to: '/distributor/slots', label: 'Bookings', icon: Calendar }
  ];

  const consumerLinks = [
    { to: '/consumer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/consumer/ration-book', label: 'Ration Book', icon: BookOpen },
    { to: '/consumer/slots', label: 'Slot Booking', icon: Calendar },
    { to: '/consumer/complaints', label: 'Complaints', icon: MessageSquare },
    { to: '/consumer/history', label: 'History', icon: History }
  ];

  const links = role === 'admin' ? adminLinks : role === 'distributor' ? distributorLinks : consumerLinks;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 md:hidden shadow-lg">
      <div className="flex items-center justify-around py-2 px-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-blue-900 bg-blue-50 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-900 scale-110' : 'text-slate-400'}`} />
              <span className="truncate max-w-[64px]">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
