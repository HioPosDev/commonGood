/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertNotificationsDialogSlide({openDialog, handleClose}: {
    openDialog: boolean;
    handleClose: (value: 'agree' | 'disagree') => void;
}) {
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Notificaciones Desactivadas"}</DialogTitle>
        <DialogContent>
            <Typography variant="body1" paragraph>
              Las notificaciones no estan habilitadas o el dispositivo movil no las permite.
            </Typography>
            <Typography variant="body1">
              Por favor, mantenga la web abierta para conocer el estado de su pedido.
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('disagree')}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
