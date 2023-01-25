import { TypedUseSelectorHook, useSelector as selectorHook, 
useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, RootState } from "./types/index";
import { useState, ChangeEvent } from "react";
import { IInputData } from "./types/data"; 


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>();

export function useForm(inputValues: IInputData) {

	const [values, setValues] = useState(inputValues);
	
		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			const {value, name} = event.target;
			setValues({...values, [name]: value});
		};

		return {values, handleChange, setValues};
};