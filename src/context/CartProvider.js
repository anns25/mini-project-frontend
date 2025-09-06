import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const initialState = {
    cartItems: []
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                return (
                    {
                        ...state,
                        cartItems: state.cartItems.map(item => item._id === action.payload._id ?
                            {
                                ...item,
                                quantity: item.quantity + 1
                            } : item
                        )
                    }
                )
            }
            else {
                return (
                    {
                        ...state,
                        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
                    }
                )
            }
        case 'REMOVE_ITEM':
            return (
                {
                    ...state,
                    cartItems: state.cartItems.filter(item => item._id !== action.payload.bookId)
                }
            )
        case 'UPDATE_ITEM':
            return (
                {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id === action.payload.bookId ?
                        { ...item, quantity: action.payload.quantity } : item)
                }
            )
        case 'CLEAR_CART':
            return initialState;

        case 'SET_CART':
            return { ...state, cartItems: action.payload }
        default:
            return state;

    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:3000/cart/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const items = response.data?.data?.items || [];

            const formattedItems = items.map(item => ({ ...item.bookId, quantity: item.quantity }));
            dispatch({ type: 'SET_CART', payload: formattedItems });
        }
        catch (err) {
            console.error("Failed to load cart", err);
            console.error("Error details:", err.response?.data || err.message);
        }
    }

    const addToCart = async (book) => {
        try {
            await axios.post('http://localhost:3000/cart/add', { bookId: book._id, quantity: 1 }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            dispatch({ type: 'ADD_TO_CART', payload: { ...book } });

        }
        catch (err) {
            console.error("Error adding to cart", err);
        }

    }

    const removeFromCart = async (bookId) => {
        try {
            await axios.delete("http://localhost:3000/cart/delete", {
                data: { bookId: bookId },

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
            );
            dispatch({ type: 'REMOVE_ITEM', payload: { bookId } });
            toast.success("Removed from cart!");
        }
        catch (err) {
            console.error("Delete error :", err.response?.data || err.message);
            toast.error("Error : Failed to remove from cart !")
        }

    };

    const updateQuantity = async (bookId, quantity) => {
        try {
            if (quantity <= 0) {
                removeFromCart(bookId);
                return;
            }

            await axios.patch('http://localhost:3000/cart/update', { bookId: bookId, quantity: quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );

            dispatch({ type: 'UPDATE_ITEM', payload: { bookId, quantity } });


        }
        catch (err) {
            console.error("Update error :", err.response?.data || err.message);
            toast.error("Error : Could not change quantity !");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchCart();
        }
    }, [])

    const totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = Number(state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ).toFixed(2));

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, dispatch, fetchCart, addToCart, updateQuantity, removeFromCart, totalItems, totalPrice }}>{children}</CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => {
    return useContext(CartContext);
}
