import { CartDetailDialogProps } from "@/app/types/cartDetailDialogProps";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List } from "@mui/material";
import { getProductDetail } from "@/app/services/cartService";
import Productcard from "../product/productCard";

export default function CartDetailDialog({cart, open, products, onClose}: CartDetailDialogProps){

  return(
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Products in Cart #{cart.id}</DialogTitle>
      <DialogContent dividers>
        <List dense>
          {cart.products.map((item, index) => {
            const product = getProductDetail(products, item.productId);
            return product ? (
              <Productcard item={item} product={product} canEdit={false} key={index} />
            ) : null;
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}