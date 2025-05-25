import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { act } from 'react';

const API_URL = 'https://6832928bc3f2222a8cb2b871.mockapi.io/products';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectedWithValue }) => {
        try {
            const response = await fetch(API_URL)
            if(!response.ok) {
                throw new Error("Fail to fectch")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectedWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${id}`)
            if(!response.ok) {
                throw new Error("Fail to fectch")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData, { rejectedWithValue }) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
            if(!response.ok) {
                throw new Error("Fail to fectch")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({id, productData}, { rejectedWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
            if(!response.ok) {
                throw new Error("Fail to fectch")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectedWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            })
            if(!response.ok) {
                throw new Error("Fail to fectch")
            }
            return id
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        currentProduct: null,
        loading: false,
        error: null, 
        message: null
    }, 
    reducers: {
        clearMessage: (state) => {
            state.message = null
        }, 
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            //fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //FetchProductByID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.currentProduct = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //addProduct
            .addCase(addProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
                state.message = "them thanh cong"
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //update 
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                const index = state.items.findIndex(item => item.id === (action.payload.id))
                if (index !== -1) {
                    state.items[index] = action.payload
                }

                state.currentProduct = action.payload
                state.message = 'Cap nhat thanh cong'
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //delete
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.items = state.items.filter(item => item.id !== action.payload)
                state.message = 'Xoa thanh cong'
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const {clearError, clearMessage} = productSlice.actions
export default productSlice.reducer