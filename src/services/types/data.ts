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
    };
}

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
    type: string;
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
};

export interface IOrder {
    status: string;
    number: number;
    createdAt: string;
    name: string;
    ingredients: Array<string>;
    _id: string;
    owner: IOwner;
    price: number;
    updatedAt: string;
};

export interface IOrderItem {
    order: IOrder;
};