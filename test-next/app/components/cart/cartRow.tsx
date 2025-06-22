import { CartRowProps } from "@/app/types/cartRowProps";
import { Button, TableCell, TableRow } from "@mui/material";

export default function CartRow({cartId, userId, date, openModal}: CartRowProps){
  return(
    <TableRow>
      <TableCell sx={{ fontSize: 18}}>{cartId}</TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
      <TableCell sx={{ fontSize: 18}}>
        <Button onClick={() => openModal(cartId)} size="small">
          Detail
        </Button>
      </TableCell>
    </TableRow>
  )
}