import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);



export default function AuthButtons(props) {
  const classes = useStyles();
    const ButtonStyle = {display:'flex', flexDirection:'row', justifyContent:'center'}

  return (
    <div className={classes.root} style={ButtonStyle}>

            <Button variant="outlined" color="secondary" onClick={props.logIn} style={{display:'block'}}>
                Войти
            </Button>

      <Button variant="outlined" color="secondary" onClick={props.registration} style={{display:'block'}}>
        Регистрация
      </Button>
    </div>
  );
}
