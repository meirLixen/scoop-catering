import thunk from "redux-thunk";
import { getAllProducts, createProduct, deleteProduct, updateProduct, copyProduct, getProductByID } from './product'
import { getAllUsers, createUser } from './user'
import { getAllOrders, createOrder, deleteOrder } from './order'
import { getAllCategories, createCategory, updateCategory } from './category'
import { getAllMenus, createMenu, deleteMenu, updateMenu, getMenuByID } from "./menu";
import { getAllAmounts } from './amount'
import { getAllProductsOnOrder } from "./productOnOrder";
import { updateUser } from "./user"
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

    createMenu,
    deleteMenu,
    updateMenu,
    createCategory,
    updateCategory,
    getAllOrders,
    createOrder,
    deleteOrder,

    getAllCategories,
    getAllMenus,
    getAllAmounts,
    getAllProductsOnOrder

];

export default AppMiddleware;