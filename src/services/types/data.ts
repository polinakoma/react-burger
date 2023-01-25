import {  GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
    CHOOSE_INGREDIENT, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILED, ADD_INGREDIENT_TO_CONSTRUCTOR, CONSTRUCTOR_DELETE, 
    CONSTRUCTOR_RESET, CONSTRUCTOR_REORDER, SET_MODAL, RESET_MODAL
} from '../actions/ingredients';
import { 
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED,
    REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILED, FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, RESET_PASSWORD, 
    RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, GET_USER, GET_USER_SUCCESS,
    GET_USER_FAILED, AUTH_CHECKED, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED 
} from '../actions/userRequests';
import { 
    WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, 
    WS_CONNECTION_ERROR, WS_GET_ALL_ORDERS
 } from '../actions/wsActionTypes';


export interface IProtectedRouteProps {
    onlyUnAuth?: boolean;
    children?: React.ReactNode;
    props?: {};
    path: string;
    exact?: boolean;
};

export interface IOrderContentModalProps {
    isModal: boolean;
};

export interface Location {
    from: {
      pathname: string;
    }
};

export interface IModalProps {
    onClose: () => void;
    children?: React.ReactNode;
    handleCloseModal:() => void;
};

export interface IIngredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    key?: string;
};

export interface IConstructorFillingProps {
	ingredient: IIngredient;
	index: number;
};

export interface ITotalPriceProps {
	totalPrice: number;
};

export interface IIngredientsList {
	title: string;
    type: string;
    ref: React.ForwardedRef<any>;
};

export interface IConstructorBunProps {
    type: "top" | "bottom" | undefined;
    position: string;
};

export interface IIngredientCardProps {
    ingredient: IIngredient;
};

export interface IModalOverlayProps {
    onClose: () => void;
};

export interface IOwner {
    createdAt?: string;
    email: string;
    name: string;
    updatedAt?: string;
    password?: string;
};

export interface IOrder {
    status: string;
    number: number;
    createdAt: string;
    name: string;
    ingredients: string[];
    _id: string;
    owner: IOwner;
    price: number;
    updatedAt: string;
};

export interface IOrderItem {
    order: IOrder;
};

export interface IInputData {
    [name: string]: string; 
};

export interface IWSActions {
    wsInit: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
};


// ingredients.ts actions

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
};
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: IIngredient[];
};
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
};
export interface IChooseIngredientAction {
    payload: IIngredient | null;
    readonly type: typeof CHOOSE_INGREDIENT;
};
export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
};
export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly payload: IOrder;
};
export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
};
export interface IAddIngredientToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly payload: IIngredient;
};
export interface IConstructorDeleteAction {
    readonly type: typeof CONSTRUCTOR_DELETE;
    readonly payload: string | undefined;
};
export interface IConstructorResetAction  {
    readonly type: typeof CONSTRUCTOR_RESET;
};
export interface IConstructorReorderAction  {
    readonly type: typeof CONSTRUCTOR_REORDER;
    readonly hoverIndex: number, dragIndex: number;
};
export interface ISetModalAction  {
    readonly type: typeof SET_MODAL;
    readonly payload: IIngredient;
};
export interface IResetModalAction  {
    readonly type: typeof RESET_MODAL;
};

export type TIngredientsActions =
    | IChooseIngredientAction 
    | IGetIngredientsFailedAction 
    | IGetIngredientsSuccessAction 
    | IGetIngredientsAction
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction
    | IAddIngredientToConstructorAction
    | IConstructorDeleteAction
    | IConstructorResetAction 
    | IConstructorReorderAction
    | ISetModalAction
    | IResetModalAction;

// userRequests.ts actions

export interface ILoginAction {
    readonly type: typeof LOGIN;
};
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: {
        email: string,
        name: string,
};
};
export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
};
export interface ILogoutAction {
    readonly type: typeof LOGOUT;
};
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
};
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
};
export interface IRegistrationAction {
    readonly type: typeof REGISTRATION;
};
export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCESS;
    readonly payload: {
            email: string,
            name: string,
    };
};
export interface IRegistrationFailedAction {
    readonly type: typeof REGISTRATION_FAILED;
};
export interface IForgotPasswordAction {
    readonly type: typeof FORGOT_PASSWORD;
};
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly payload: boolean;
};
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
};
export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
};
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
};
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
};
export interface IGetUserAction {
    readonly type: typeof GET_USER;
};
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: IOwner;
};
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
};
export interface IAuthCheckedAction {
    readonly type: typeof AUTH_CHECKED;
};
export interface IUpdateUserDataAction {
    readonly type: typeof UPDATE_USER_DATA;
};
export interface IUpdateUserDataSuccessAction {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly payload: {
        email: string,
        name: string,
};
};

export interface IUpdateUserDataFailedAction {
    readonly type: typeof UPDATE_USER_DATA_FAILED;
};

export type TUserRequestsActions = 
    | ILoginAction  
    | ILoginFailedAction
    | ILoginSuccessAction
    | ILogoutAction 
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IRegistrationAction 
    | IRegistrationSuccessAction
    | IRegistrationFailedAction 
    | IForgotPasswordAction 
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordAction
    | IResetPasswordSuccessAction 
    | IResetPasswordFailedAction 
    | IGetUserAction 
    | IGetUserSuccessAction
    | IGetUserFailedAction 
    | IAuthCheckedAction 
    | IUpdateUserDataAction 
    | IUpdateUserDataSuccessAction
    | IUpdateUserDataFailedAction;

// wsActionTypes.ts actions

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
};
export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
};
export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
};
export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
};
export interface IWsGetAllOrdersAction {
    readonly type: typeof WS_GET_ALL_ORDERS;
    readonly payload: {
        success: boolean;   
        orders: IOrder[];
        total: number;
        totalToday: number;
    };
};

export type TWsTypesActions =
| IWsConnectionStartAction
| IWsConnectionClosedAction
| IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsGetAllOrdersAction;