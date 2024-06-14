import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './ingredientsSlice';


const initialState = {
    orders: [],
    status: RequestStatus
}

