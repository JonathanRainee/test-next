'use client';

import { Button, Box, Typography, Stack, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/userContext';
import ProtectedRoute from '../components/protectedRoute';
import { CartResponse, products } from '../response/cartResponse';
import { fetchCart, filterCartByProductName } from '../services/cartService';
import { useApiRequest } from '../hooks/useApiRequest';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import NavBar from '../components/navbar';
import { fetchProducts } from '../services/productService';
import { useProductContext } from '../context/productContext';
import { useCartContext } from '../context/cartContext';
import Snackbar from '../components/snackbar';
import CartRow from '../components/cart/cartRow';
import CartDetailDialog from '../components/cart/cartDetailDialog';
import AddCartDialog from '../components/cart/addCartDialog';

const ITEMS_PER_PAGE = 5;

export default function MainPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSnackbarCartOpen, setIsSnackbarCartOpen] = useState<boolean>(false);
  const [currentProductsList, setCurrentProductsList] = useState<products[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const [openModalcart, setOpenModalCart] = useState<boolean>(false);
  const [currentProductName, setCurrentProductName] = useState<string>('');
  const [currentProductId, setCurrentProductId] = useState<number | ''>('');
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [productName, setProductName] = useState<string>('');
  
  const {products, setProducts} = useProductContext();
  const {carts, setCarts} = useCartContext();
  const {sendRequest} = useApiRequest();
  const {user} = useUserContext();
  
  useEffect(()=>{ 
    loadData(); 
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [productName]);

  
  useEffect(() => {
    if (localStorage.getItem('loginSuccess') === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('loginSuccess');
    }
  }, []);
  
  const handleOpenModal = (id: number) => setOpenModalId(id);
  const handleCloseModal = () => setOpenModalId(null);

  async function loadData() {
    const [cartData] = await fetchCart(sendRequest as <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T> | null>);
    const [productData] = await fetchProducts(sendRequest as <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T> | null>);
    setCarts(cartData);
    setProducts(productData);
  }
  
  function onCreateCartModalClose(){
    setCurrentProductName('');
    setCurrentProductId('');
    setCurrentQuantity(1);
    setCurrentProductId(0);
    setOpenModalCart(false);
  }

  function onChangeModal(productName:string, productId:number){
    setCurrentProductId(productId);
    setCurrentProductName(productName);
  }
  
  function handleDeleteProductFromCurrentList(productId: number){
    setCurrentProductsList(prev => prev.filter(p => p.productId != productId))
  }

  function handleAddProductToCurrentList() {
    if (!currentProductId || currentQuantity < 1) return;

    const isDuplicate = currentProductsList.some(p => p.productId === currentProductId);
    if (isDuplicate) return;

    const newItem = {
      productId: currentProductId,
      quantity: currentQuantity,
    };

    setCurrentProductsList(prev => [...prev, newItem]);

    setCurrentProductId('');
    setCurrentProductName('');
    setCurrentQuantity(1);
  }

  function handleCreateNewCart(){
    if(currentProductsList.length === 0 || !user) return;
    const newCart: CartResponse = {
      id: carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1,
      userId: user.id,
      date: new Date().toISOString(),
      products: currentProductsList,
      __v: 0
    }

    setCarts((prev) => [...prev, newCart]);
    setCurrentProductsList([]);
    onCreateCartModalClose();
    setIsSnackbarCartOpen(true);
  }

  const filteredCarts = carts && products ? filterCartByProductName(carts, products, productName).sort((a,b) => b.id - a.id) : [];
  
  const totalPage = filteredCarts ? Math.ceil(filteredCarts.length/ITEMS_PER_PAGE) : 0;
  
  const paginatedCarts = filteredCarts?.slice(
    (currentPage - 1) *ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )


  return (
    <ProtectedRoute>
      <NavBar productName={productName} onSearchChange={setProductName}/>

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}>
        {
         paginatedCarts.length === 0 ? 
         <Box display='flex' justifyContent='center'> 
          <Typography variant='h4' sx={{color: 'grey'}}>
            Sorry, there is no cart with the following product name
          </Typography>
         </Box>
         :
         <>
         
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ fontSize: 18}}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCarts  &&
                  paginatedCarts .map((c) => {
                    return (
                      <React.Fragment key={c.id}>
                        <CartRow cartId={c.id} date={c.date} userId={c.userId} openModal={() => handleOpenModal(c.id)}/>
                        <CartDetailDialog 
                          cart={c} 
                          open={openModalId === c.id} 
                          products={products!} 
                          onClose={handleCloseModal}/>
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
          <Stack alignContent='center' justifyContent='center' sx={{width:'20%', mx:'auto'}}>
            <Button
              variant="outlined"
              onClick={() => setOpenModalCart(true)}>
              Add new cart
            </Button>

          </Stack>
         </>
        }

        <AddCartDialog
          open={openModalcart}
          onClose={onCreateCartModalClose}
          onAddCart={handleCreateNewCart}
          onAddProduct={handleAddProductToCurrentList}
          onDeleteProduct={handleDeleteProductFromCurrentList}
          onProductChange={onChangeModal}
          currentProductsList={currentProductsList}
          currentProductId={currentProductId}
          currentQuantity={currentQuantity}
          setCurrentQuantity={setCurrentQuantity}
          products={products!}/>


        <Snackbar text='Login successful' open={openSnackbar} onClose={setOpenSnackbar} />
        <Snackbar text='Cart created!' open={isSnackbarCartOpen} onClose={setIsSnackbarCartOpen} />
        
      </Box>
    </ProtectedRoute>
  );
}