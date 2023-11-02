import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { useAuth } from '../hooks/context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        navigate('/grants');
        break;
      default:
        console.log('Invalid sidebar click!');
        break;    
    }
  }

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
          <Link to="/">
            Log Out
          </Link>
        </ListItem>
      </List>
    </Card>
  );
}