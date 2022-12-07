import thunk from "redux-thunk";
import { getAllProducts, createProduct, deleteProduct, updateProduct, copyProduct, getProductByID } from './product'
import { getAllUsers, createUser } from './user'
import { getAllOrders, createOrder, deleteOrder } from './order'
import { getAllCategories } from './category'
import { getAllAmounts } from './amount'
import { getAllProductsOnOrder } from "./productOnOrder";
import {updateUser} from "./user"
// import { setSearchWord } from './searchWord';


const AppMiddleware = [
    thunk,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    copyProduct,
    getProductByID,
    // setSearchWord,

    getAllUsers,
    createUser,
    updateUser,


    getAllOrders,
    createOrder,
    deleteOrder,

    getAllCategories,
    getAllAmounts,
    getAllProductsOnOrder

];

export default AppMiddleware;