import createAsyncDispatcher, { initialAsyncState, createAsyncHandler } from "../asyncActionUtils";
import React, { createContext, useReducer, useContext } from "react";
import * as api from "../api";
import { createHash, getBirthday } from "../../common";

const patientsState = initialAsyncState;
const patientsHandler = createAsyncHandler("GET_PATIENTS");

function patientsReducer(state, action) {
  switch (action.type) {
    case "GET_PATIENTS":
    case "GET_PATIENTS_SUCCESS":
    case "GET_PATIENTS_ERROR":
      return patientsHandler(state, action);
    case "ADD_PATIENT":
      const data = {
        ...action.data,
        PATIENT_ID: createHash()
      };
      console.log("ADD_PATIENT", api.AddPatient(data));
      return {
        ...state,
        data: state.data.concat(data)
      };
    case "UPDATE_PATIENT":
      console.log("UPDATE_PATIENT", api.UpdatePatient(action.data));
      return {
        ...state,
        data: state.data.map(patient =>
          patient.PATIENT_ID === action.data.PATIENT_ID ? action.data : patient
        )
      };
    case "DELETE_PATIENT":
      console.log("DELETE_PATIENT", api.DeletePatient(action.id));
      return {
        ...state,
        data: state.data.filter(patient => patient.PATIENT_ID !== action.id)
      };
    case "SEARCH_PATIENT":
      return {
        ...state,
        filteredData: state.data.filter(
          patient =>
            patient.NAME.search(action.search) >= 0 ||
            patient.SEX.search(action.search) >= 0 ||
            patient.PATIENT_NUMBER.search(action.search) >= 0 ||
            getBirthday(patient.ID_NUMBER).search(action.search) >= 0
        )
      };
    case "ORDER_BY_DATE_AESC":
      return {
        ...state,
        data: state.data.sort(function(a, b) {
          return new Date(b.LAST_UPDATE) - new Date(a.LAST_UPDATE);
        })
      };
    case "ORDER_BY_DATE_DESC":
      return {
        ...state,
        data: state.data.sort(function(a, b) {
          return new Date(a.LAST_UPDATE) - new Date(b.LAST_UPDATE);
        })
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

const PatientStateContext = createContext(null);
const PatientDispatchContext = createContext(null);

export function PateintsProvider({ children }) {
  const [state, dispatch] = useReducer(patientsReducer, patientsState);

  return (
    <PatientStateContext.Provider value={state}>
      <PatientDispatchContext.Provider value={dispatch}>{children}</PatientDispatchContext.Provider>
    </PatientStateContext.Provider>
  );
}

export function usePatientsState() {
  const state = useContext(PatientStateContext);
  if (!state) {
    throw new Error("Can not find PatientProvider");
  }
  return state;
}

export function usePatientsDispatch() {
  const dispatch = useContext(PatientDispatchContext);
  if (!dispatch) {
    throw new Error("can not find PatientProvider");
  }
  return dispatch;
}

export const getPatients = createAsyncDispatcher("GET_PATIENTS", api.getPatients);
