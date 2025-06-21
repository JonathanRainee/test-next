'use client';

import { Button, Box, Typography, Snackbar, List, ListItem, ListItemText, Divider, Stack, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, ListItemAvatar, Avatar, AppBar, Toolbar, InputBase } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import ProtectedRoute from '../components/protectedRoute';
import { CartResponse } from '../response/cartResponse';
import { ProductResponse } from '../response/productResponse';
import { fetchCartAndProducst, filterCartByProductName, getProductDetail } from '../services/cartService';
import { useApiRequest } from '../hooks/useApiRequest';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const ITEMS_PER_PAGE = 5;

export default function MainPage() {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {logout} = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carts, setCarts] = useState<CartResponse[] | null>(null);
  const [products, setProducts] = useState<ProductResponse[] | null>(null);
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>('');

  const {sendRequest} = useApiRequest();

  async function loadData() {
    const [cartData, productData] = await fetchCartAndProducst(sendRequest as <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T> | null>);
    setCarts(cartData);
    setProducts(productData);
  }

  useEffect(() => { loadData(); }, []);

  const handleOpenModal = (id: number) => setOpenModalId(id);
  const handleCloseModal = () => setOpenModalId(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [productName]);

  
  useEffect(() => {
    if (localStorage.getItem('loginSuccess') === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('loginSuccess');
    }
  }, []);

  const filteredCarts = carts && products
    ? filterCartByProductName(carts, products, productName)
    : [];
  
  const totalPage = filteredCarts ? Math.ceil(filteredCarts.length/ITEMS_PER_PAGE) : 0;
  
  const paginatedCarts = filteredCarts?.slice(
    (currentPage - 1) *ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <ProtectedRoute>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Orders Dashboard
          </Typography>

          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: '#f0f0f0',
              mr: 2,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                pl: 1,
              }}
            >
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                color: 'inherit',
                pl: 4,
                pr: 2,
                py: 0.5,
                width: 300,
              }}
              onChange={(x)=>setProductName(x.target.value)}
            />
          </Box>

          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ fontSize: 18}}>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCarts  &&
                paginatedCarts .map((c) => {
                  return (
                    <React.Fragment key={c.id}>
                      <TableRow>
                        <TableCell sx={{ fontSize: 18}}>{c.id}</TableCell>
                        <TableCell>{c.userId}</TableCell>
                        <TableCell>{new Date(c.date).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ fontSize: 18}}>
                          <Button onClick={() => handleOpenModal(c.id)} size="small">
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                      <Dialog
                        open={openModalId === c.id}
                        onClose={handleCloseModal}
                        fullWidth
                        maxWidth="sm">
                        <DialogTitle>Products in Cart #{c.id}</DialogTitle>
                        <DialogContent dividers>
                          <List dense>
                            {c.products.map((item) => {
                              const product = getProductDetail(products!, item.productId);
                              return (
                                <Box key={item.productId}>
                                  <ListItem alignItems="flex-start">
                                    {product && (
                                      <ListItemAvatar>
                                        <Avatar
                                          src={product.image}
                                          alt={product.title}
                                          variant="square"
                                          sx={{ width: 50, height: 50, mr: 2 }}/>
                                      </ListItemAvatar>
                                    )}
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
                                  </ListItem>
                                </Box>

                              );
                            })}
                          </List>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseModal}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
                  );
                })}
                
            </TableBody>
          </Table>
        </TableContainer>
        <Stack justifyContent="center" display="flex" flexDirection="row" direction="row" spacing={2} sx={{ my: 2, width:'100%' }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography align="center" sx={{ mt: 1.2, color:'black' }}>
            Page {currentPage} of {totalPage}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPage}>
            Next
          </Button>
        </Stack>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Login successful!"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      </Box>
    </ProtectedRoute>
  );
}
