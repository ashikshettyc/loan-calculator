import * as React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    href: '/',
    name: 'HOME',
  },
  { href: '/exchangerates', name: 'EXCHANGE RATES(LIVE)' },
  { href: '/about', name: 'ABOUT' },
  { href: '/error', name: 'ERROR PAGE' },
];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const { mode, toggleTheme } = useThemeContext();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };
  const checked = mode === 'dark';
  const isActive = (href: string) => location.pathname === href;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Loan Calculator
      </Typography>
      <Divider />

      <Stack direction={'column'} spacing={2}>
        {navItems.map((item) => (
          <Button
            key={item.name}
            href={item.href}
            color="inherit"
            sx={{
              backgroundColor: isActive(item.href)
                ? 'rgba(255, 255, 255, 0.2)'
                : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '50px' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.href}
                sx={{
                  color: '#fff',
                  backgroundColor: isActive(item.href)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleThemeToggle}
                inputProps={{ 'aria-label': 'theme switch' }}
              />
            }
            label={checked ? 'Dark Mode' : 'Light Mode'}
          />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Loan Calculator
          </Typography>
        </Drawer>
      </nav>
    </Box>
  );
}
