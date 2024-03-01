import apiHelper from "@/helpers/api.helpers";
import { ACTIVATE_DRIVER, ACTIVATE_RIDER, ACTIVATE_TRIP, ACTIVATE_USER, ADD_DRIVER, ADD_DRIVERS_AGREEMENT, ADD_FAQ, ADD_PRIVACY_POLICY, ADD_RIDER, ADD_USER, ADD_USER_AGREEMENT, ADD_USER_GUIDLINES, COMPLETE_BACKGROUND_CHECK, DEACTIVATE_TRIP, DELETE_DRIVER, DELETE_DRIVERS_AGREEMENT, DELETE_FAQ, DELETE_PRIVACY_POLICY, DELETE_RIDER, DELETE_USER, DELETE_USER_AGREEMENT, DELETE_USER_GUIDLINES, DRIVERS_LIST, EDIT_DRIVER, EDIT_RIDER, EDIT_USER, FEEDBACK_LIST, GET_FAQS, GET_SETTINGS, GET_USERS, LOGIN, LOGOUT, MONTH_WISE_DATA, MONTH_WISE_GROWTH, REGISTER, RESET_PASSWORD, RIDERS_LIST, STATES_LIST, TOTAL_DATA, TRIPS_LIST, UPDATE_DRIVERS_AGREEMENT, UPDATE_FAQ, UPDATE_PRIVACY_POLICY, UPDATE_USER_AGREEMENT, UPDATE_USER_GUIDLINES } from "./endpoints";
import { getCookie } from "cookies-next";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

// const BASE_URL = 'http://13.201.94.169'

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

export const addUser = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_USER}`, body);
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

export const addDriver = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_DRIVER}`, body);
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

export const completeBackgroundCheck = async (driverId: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${COMPLETE_BACKGROUND_CHECK}`, { id: driverId });
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

export const addRider = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_RIDER}`, body);
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

export const deactivateTrip = async (tripId: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DEACTIVATE_TRIP}`, { tripId: tripId });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const activateTrip = async (tripId: string) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ACTIVATE_TRIP}`, { tripId: tripId });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Feedback

export const getFeedback = async (page: number, pageSize: number, searchQuery: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${FEEDBACK_LIST}?page=${page}&limit=${pageSize}&searchQuery=${searchQuery}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Settings

export const getSettings = async () => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${GET_SETTINGS}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

//  privacy policy
export const addPrivacyPolicy = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_PRIVACY_POLICY}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const updatePrivacyPolicy = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${UPDATE_PRIVACY_POLICY}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deletePrivacyPolicy = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_PRIVACY_POLICY}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// user agreeemets
export const addUserAgreement = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_USER_AGREEMENT}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const updateUserAgreement = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${UPDATE_USER_AGREEMENT}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deleteUserAgreement = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_USER_AGREEMENT}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// user guidlines
export const addUserGuidlines = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_USER_GUIDLINES}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const updateUserGuidlines = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${UPDATE_USER_GUIDLINES}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deleteUserGuidlines = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_USER_GUIDLINES}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// drivers agreement

export const addDriversAgreement = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_DRIVERS_AGREEMENT}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const updateDriversAgreement = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${UPDATE_DRIVERS_AGREEMENT}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const deleteDriversAgreement = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_DRIVERS_AGREEMENT}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

// Faqs

export const getFaqsList = async (page: number, pageSize: number, searchQuery: string) => {
  try {
    const response = await apiHelper.get(`${BASE_URL}${GET_FAQS}?page=${page}&limit=${pageSize}&searchQuery=${searchQuery}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};

export const addFaq = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${ADD_FAQ}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};


export const updateFaq = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${UPDATE_FAQ}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};


export const deleteFaq = async (body: any) => {
  try {
    const response = await apiHelper.post(`${BASE_URL}${DELETE_FAQ}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data };
  }
};