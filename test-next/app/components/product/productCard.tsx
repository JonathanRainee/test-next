import { ProductCardProps } from "@/app/types/productProps";
import { Avatar, Box, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function Productcard({item, product, canEdit, onDelete}: ProductCardProps){

  return(
    <Box key={item.productId} justifyContent='center' display='flex'>
      <ListItem alignItems="flex-start"  sx={{border: '1px solid grey', mx: 3, my: 1, p:2}}>
        <ListItemAvatar>
          <Avatar
            src={product.image}
            alt={product.title}
            variant="square"
            sx={{ width: 60, height: 60, mr: 2 }}/>
        </ListItemAvatar>
        <ListItemText
          primary={
            product
              ? <>
                {product.title} — {item.quantity} pcs
                <br/>
                Rating: {product.rating.rate}
              </>
              : `Product ID ${item.productId} (not found)`
          }/>
          {canEdit && (
          <Box ml={2}>
            <Button
              onClick={() => onDelete?.(item.productId)}
              variant="outlined"
              color="error"
              sx={{p:1, m:1}}>
              X
            </Button>
          </Box>
        )}
      </ListItem>
    </Box>
  )
}