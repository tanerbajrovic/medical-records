import React from 'react';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useLocation } from 'react-router-dom'
import { Avatar, Container, Box } from '@mui/material';

function NotFound() {
  const deployedURL = window.location.href;
  const location = useLocation();

  return (
    <div>
      <Container component={'main'} maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AnnouncementIcon/>
        </Avatar>
        <h1>Page Not Found</h1>
        <p>The requested URL {deployedURL} was not found on this server.</p>
        <p>The requested URL {location.pathname} was not found on this server.</p>
        </Box>
      </Container>
    </div>
  );
}

export default NotFound;