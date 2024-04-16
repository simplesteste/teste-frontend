import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import React from 'react'

type CustomDialogProps = {
  open: boolean
  title: string
  content: string
  onClose: () => void
  onConfirm: () => void
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  content,
  title,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Não
        </Button>
        <Button onClick={onConfirm} color="error">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
