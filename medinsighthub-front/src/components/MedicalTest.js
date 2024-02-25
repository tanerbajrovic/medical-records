import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@mui/material';

const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
  },
});

const MedicalTest = ({ testName, date, results, additionalInfo }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {testName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Date: {date}
        </Typography>
        <Typography variant="body2" component="p">
          Results: {results}
        </Typography>
        <Typography variant="body2" component="p">
          Additional Info: {additionalInfo}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MedicalTest;
