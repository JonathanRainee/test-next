'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, MenuItem, List} from '@mui/material';
import { getProductDetail } from '@/app/services/cartService';
import Productcard from '../product/productCard';
import { AddCartDialogProps } from '@/app/types/addCartDialogProps';


export default function AddCartDialog({
  open,
  onClose,
  onAddCart,
  onAddProduct,
  onDeleteProduct,
  onProductChange,
  currentProductsList,
  currentProductId,
  currentQuantity,
  setCurrentQuantity,
  products,
}: AddCartDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new Cart</DialogTitle>

      <List dense>
        {currentProductsList.map((item) => {
          const product = getProductDetail(products, item.productId);
          return product ? (
            <Productcard
              key={item.productId}
              item={item}
              product={product}
              canEdit={true}
              onDelete={onDeleteProduct}
            />
          ) : null;
        })}
      </List>

      <DialogContent>
        <Typography mb={1}>What product do you want to add?</Typography>
        <TextField
          select
          label="Product"
          value={currentProductId}
          onChange={(e) => {
            const selectedProductId = Number(e.target.value);
            const selectedProduct = products.find((p) => p.id === selectedProductId);
            if (selectedProduct) {
              onProductChange(selectedProduct.title, selectedProduct.id);
            }
          }}
          fullWidth
          autoFocus
        >
          {products && products.map((p) => (
            <MenuItem value={p.id} key={p.id}>
              {p.title}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogContent>
        <Typography mb={1}>How much quantity do you want to add?</Typography>
        <TextField
          type="number"
          label="Quantity"
          value={currentQuantity}
          onChange={(e) => setCurrentQuantity(Number(e.target.value))}
          inputProps={{ min: 1 }}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onAddProduct}>
          Add product
        </Button>
      </DialogActions>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onAddCart}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
