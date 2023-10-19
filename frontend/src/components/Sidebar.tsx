import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/context/authContext';
 
export function HomePageSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate('/');
    console.log('Logout successful!');
  }

  function handleSidebarClick(event: { currentTarget: { id: any; }; }): void {
    switch (event?.currentTarget?.id) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'charts':
        navigate('/testchart');
        break;
      case 'calendar':
        navigate('/calendar');
        break;
      default:
        console.log('Invalid sidebar click!');
        break;    
    }
  }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Grant Management
        </Typography>
      </div>
      <List>
        <ListItem id="dashboard" onClick={handleSidebarClick}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
            Dashboard
        </ListItem>
        <ListItem id="calendar" onClick={handleSidebarClick}>
          <ListItemPrefix>
            <CalendarDaysIcon className="h-5 w-5">
            </CalendarDaysIcon>
          </ListItemPrefix>
            Calendar
        </ListItem>
        <ListItem id="charts" onClick={handleSidebarClick}>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
            Charts
        </ListItem>
        <ListItem onClick={handleSidebarClick}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={handleSidebarClick}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}