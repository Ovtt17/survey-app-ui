import { Box, Divider, Typography } from '@mui/material';

const OrSeparator = () => {
  return (
    <Box display="flex" alignItems="center" marginY={1}>
      <Divider style={{ flex: 1 }} />
      <Typography variant="body1" style={{ margin: '0 10px' }}>or</Typography>
      <Divider style={{ flex: 1 }} />
    </Box>
  );
}

export default OrSeparator;