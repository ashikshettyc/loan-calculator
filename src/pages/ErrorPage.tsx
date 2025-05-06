import { Box, Button, Typography } from '@mui/material';

export default function ErrorPage() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
        height: '80vh',
      }}
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Button href="/" variant="outlined">
        Go to Home
      </Button>
    </Box>
  );
}
