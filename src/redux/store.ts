import { configureStore, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  exp: number;
};

export type RootState = {
  auth: AuthState;
};

type AuthState = {
  isAuthenticated: boolean;
};

function checkTokenExpiration(): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const decodedToken: DecodedToken = jwtDecode(token);
  const expirationDate = new Date(decodedToken.exp * 1000);
  if (new Date() > expirationDate) {
    localStorage.removeItem('token');
    return false;
  }
  return true;
}

const initialState: AuthState = {
  isAuthenticated: checkTokenExpiration(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});