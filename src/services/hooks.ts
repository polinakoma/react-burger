import { TypedUseSelectorHook, useSelector as selectorHook, 
useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, AppThunk, RootState } from "./types";
import { useState } from "react";


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export function useForm(inputValues) {

	const [values, setValues] = useState(inputValues);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
};