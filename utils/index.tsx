import apiHelper from "@/helpers/api.helpers";
import { ACTIVATE_DRIVER, ACTIVATE_RIDER, ACTIVATE_USER, DELETE_DRIVER, DELETE_RIDER, DELETE_USER, DRIVERS_LIST, EDIT_DRIVER, EDIT_RIDER, EDIT_USER, GET_USERS, LOGIN, LOGOUT, MONTH_WISE_DATA, MONTH_WISE_GROWTH, REGISTER, RESET_PASSWORD, RIDERS_LIST, STATES_LIST, TOTAL_DATA, TRIPS_LIST } from "./endpoints";
import { getCookie } from "cookies-next";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const registration = async (body: any) => {
  try {
    const response = await axios.post(`${BASE_URL}${REGISTER}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}${LOGIN}`, { email: username, password: password });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const resetPassword = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}${RESET_PASSWORD}`, { email: username, password: password });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const logout = async () => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${LOGOUT}`, { email: getCookie('email') });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};


export const getUsers = async (page: number, pageSize: number, searchQuery: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${GET_USERS}?page=${page}&limit=${pageSize}&searchQuery=${searchQuery}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const getUsersById = async (id: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${GET_USERS}/${id}`)
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const editUser = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${EDIT_USER}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deleteUser = async (email: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_USER}`, { email: email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const activateUser = async (email: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ACTIVATE_USER}`, { email: email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Dashboard

export const getTotalData = async () => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${TOTAL_DATA}`)
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const getMonthWise = async () => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${MONTH_WISE_DATA}`)
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const getMonthWiseGrowth = async () => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${MONTH_WISE_GROWTH}`)
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Drivers

export const getDrivers = async (page: number, pageSize: number, searchQuery: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${DRIVERS_LIST}?page=${page}&limit=${pageSize}&searchQuery=${searchQuery}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const editDriver = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${EDIT_DRIVER}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deleteDriver = async (email: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_DRIVER}`, { email: email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const activateDriver = async (email: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ACTIVATE_DRIVER}`, { email: email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Riders

export const getRiders = async (page: number, pageSize: number, searchQuery: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${RIDERS_LIST}?page=${page}&limit=${pageSize}&searchQuery=${searchQuery}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const editRider = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${EDIT_RIDER}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deleteRider = async (email: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_RIDER}`, { email: email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const activateRider = async (email: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ACTIVATE_RIDER}`, { email: email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Trip

export const getStates = async () => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${STATES_LIST}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const getTrips = async (page: number, pageSize: number, state: string, searchQuery: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${TRIPS_LIST}?page=${page}&limit=${pageSize}&state=${state}&searchQuery=${searchQuery}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};