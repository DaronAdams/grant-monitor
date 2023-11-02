
import {
  CurrencyDollarIcon,
  UsersIcon,
  CogIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { useAuth } from '../hooks/context/authContext';
import { useNavigate } from 'react-router-dom';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'relative',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
   
export default function DefaultSpeedDial() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate('/');
    console.log('Logout successful!');
  }

  const toGrantDashboard = () => {
    navigate('/grants');
  }

  const toEmployeeDashboard = () => {
    navigate('/employees');
  }

  const toSettings = () => {
    navigate('/settings');
  }

  const actions = [
    { icon: <CurrencyDollarIcon style={{ padding: '5px' }} />, name: 'Grants', onClick: toGrantDashboard},
    { icon: <UsersIcon style={{ padding: '5px' }} />, name: 'Employees', onClick: toEmployeeDashboard},
    { icon: <CogIcon style={{ padding: '5px' }} />, name: 'Change Password', onClick: toSettings},
    { icon: <LockClosedIcon style={{ padding: '5px' }} />, name: 'Log Out', onClick: handleLogout},
  ];

  
  return (

    <Box sx={{ position: 'relative', mr: 3}}>

      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        hidden={false}
        icon={<SpeedDialIcon />}
        direction={'down'}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            
          />
        ))}
      </StyledSpeedDial>
    </Box>

  );
}