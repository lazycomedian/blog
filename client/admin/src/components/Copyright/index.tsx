import { Link, Typography, TypographyProps } from '@mui/material';
import { memo } from 'react';

interface CopyrightProps extends TypographyProps {}

const Copyright: React.FC<CopyrightProps> = props => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://blog.baobiwang.com/">
        blog.baobiwang.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default memo(Copyright);
