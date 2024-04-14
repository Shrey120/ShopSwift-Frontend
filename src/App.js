import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Product from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Login from "./pages/Login";
import CartItems from "./pages/CartItems";
import Footer from "./components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { AppContext } from "./context/AppContext";
import Signup from "./pages/SignUp";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import Orders from "./pages/Orders";
import UserDetails from "./components/UserDetails";
import Admin from "./pages/Admin";
import AdminUsers from "./components/AdminUsers";
import AdminOrders from "./components/AdminOrders";
import AdminUpdate from "./components/AdminUpdate";
import AdminProduct from "./components/AdminProduct";
import AdminUpdateProduct from "./components/AdminUpdateProduct";
import AdminNew from "./components/AdminNew";
import AdminDashboard from "./components/AdminDashboard";

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("CartItems");
  if (localCartData === null) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const getLocalUser = () => {
  let localUser = localStorage.getItem("User");
  if (localUser === null) {
    return null;
  } else {
    return JSON.parse(localUser);
  }
};
function App() {
  // const [state, dispatch] = useReducer(reducerFun,initialState);
  const navigator = useNavigate();

  const baseUrl = "https://shopswift-backend.onrender.com/";
  // autherization
  const [user, setUser] = useState(getLocalUser);
  const [loading, setLoading] = useState(false);
  // product display
  const [product, setProduct] = useState([]);

  // No. of cart Items
  const [cartValue, setCartValue] = useState(1);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [activeStyle, setActiveStyle] = useState(true);
  // filters
  const [filteredItems, setFilteredItems] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCompany, setSelectedCompany] = useState("ALL");
  const [selectedColor, setSelectedColor] = useState("ALL");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState("");
  const [buttonClicked, setButtonClicked] = useState("null");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  // cart Items
  const [cartItems, setCartItems] = useState(getLocalCartData);
  const [cartItemColor, setCartItemColor] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  // Orders
  const [orders, setOrders] = useState([]);
  // Admin
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  // Laoctaion and time
  const [city, setCity] = useState("");
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  // Getting Location
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setCity(data.address.city));
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
    setTotalPriceQunat();
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    let priceArr = product && product.map((curElem) => curElem.price);
    if (priceArr) {
      setMaxPrice(Math.max(...priceArr));
    }
    setSelectedPrice(maxPrice);
  }, [product]);

  useEffect(() => {
    filterProducts();
  }, [
    selectedCategory,
    searchItem,
    selectedCompany,
    sortOrder,
    selectedColor,
    selectedPrice,
  ]);

  // function to login user
  const login = (email, password) => {
    setLoading(true);
    fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.success) {
          showAlert("Welcome " + response.name, false);
          setUser(response);
          navigator("/", { replace: true });
        } else showAlert(response.message, true);
      })
      .catch((err) => setLoading(false));
  };

  // function signup user
  const signup = (name, email, password) => {
    setLoading(true);
    fetch(baseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.success) {
          showAlert("Account Created Successfully ", false);
          navigator("/login", { replace: true });
        } else showAlert(response.message, true);
      })
      .catch((err) => {
        setLoading(false);
        showAlert(err, true);
      });
  };

  // User Contacts
  const contact = (name, query, email) => {
    setLoading(true);
    fetch(baseUrl + "contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, query, email }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.success) {
          showAlert("Your Query/Feedback is sent successfully", false);
        } else showAlert(response.message, true);
      })
      .catch((err) => {
        setLoading(false);
        showAlert(err, true);
      });
  };
  // function to show products
  const showProducts = () => {
    fetch(baseUrl + "products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setFilteredItems(data.products);
        setSelectedCategory("ALL");
        setSelectedCompany("ALL");
        setSearchItem("");
        setButtonClicked("null");
        setMaxPrice(0);
      });
  };
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(currentDate.getDate()).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  if (!city) {
    setCity("India");
  }
  // AddUserOrder
  const addingOrder = async (sessionId, name, email) => {
    const response = await fetch(baseUrl + "storeOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        cartItems,
        sessionId,
        name,
        email,
        city,
        formattedDate,
      }),
    });

    const session = await response.json();
    if (session.success) {
      showAlert(session.message, false);
    }
  };

  // Stripe Payment
  const onCheckOut = async (e) => {
    e.preventDefault();
    try {
      const stripe = await loadStripe(
        "pk_test_51NdCYxSERmmQORdUn0z3ZPr2UAKV1UibQ2wrvVcCAxfNLzCnAPfvTptZnKVK4WE2g5MCoiwcPhncQImwZTMen48j00lZ6rPofp"
      );
      const body = {
        products: cartItems,
      };
      const response = await fetch(baseUrl + "cart/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const session = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      addingOrder(session.id, user.name, user.userData.email);

      if (result.error) {
        console.log(result.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // GetUserOrder
  const fetchOrders = () => {
    fetch(baseUrl + "orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orderedItems);
        } else {
          showAlert(data.message, true);
        }
      })
      .catch(() => {
        showAlert("Failed to fetch transactions ", true);
      });
  };

  // Cancel Order
  const deleteOrderUrl = baseUrl + "orders/delete";
  const cancelOrder = async (id) => {
    try {
      const response = await fetch(`${deleteOrderUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
        fetchOrders();
      }
    } catch (error) {
      showAlert(error);
    }
  };

  // Admin route
  const showData = async () => {
    try {
      const response = await fetch(baseUrl + "admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAllUsers(data.users);
      } else {
        setAllUsers([]);
        showAlert(data.message, true);
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed to fetch Users ", true);
    }
  };

  // Deleting user
  const deleteUrl = baseUrl + "admin/users/delete/";
  const deleteUserHandler = async (id) => {
    try {
      const response = await fetch(`${deleteUrl}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: user.token,
        },
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
        showData();
      }
    } catch (error) {
      showAlert(error);
    }
  };

  // Updating User
  const updateUrl = baseUrl + "admin/users/update/";
  const updateHandler = async (id, body) => {
    try {
      const response = await fetch(`${updateUrl}${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
      }
    } catch (error) {
      showAlert(error);
    }
  };

  // Deleting Products
  const deletePUrl = baseUrl + "admin/products/delete/";
  const deleteProductHandler = async (id) => {
    try {
      const response = await fetch(`${deletePUrl}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: user.token,
        },
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
        showProducts();
      }
    } catch (error) {
      showAlert(error);
    }
  };

  // Update Product
  const updateProductUrl = baseUrl + "admin/products/update/";
  const updateProductHandler = async (id, body) => {
    try {
      const response = await fetch(`${updateProductUrl}${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
      }
    } catch (error) {
      showAlert(error, true);
    }
  };

  // Add Product
  const addProduct = async (body) => {
    try {
      const response = await fetch(baseUrl + "admin/products/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
      }
    } catch (error) {
      showAlert(error, true);
    }
  };

  // GetOrders

  const updateOrderUrl = baseUrl + "admin/orders/";
  const getOrders = async () => {
    try {
      const response = await fetch(baseUrl + "admin/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAllOrders(data.orders);
      }
    } catch (error) {
      showAlert(error, true);
    }
  };

  // UpdateOrderStatus
  const updateOrderStatus = async (orderStatus, id) => {
    try {
      const response = await fetch(`${updateOrderUrl}${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(orderStatus),
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, false);
        return true; // Indicate that the update was successful
      }
    } catch (error) {
      showAlert(error, true);
    }
  };

  const bgColor = (status) => {
    if (status === "Delivered") {
      return {
        backgroundColor: "lightgreen",
        color: "darkgreen",
      };
    } else if (status === "Dispatched") {
      return {
        backgroundColor: "rgb(255, 255, 153)",
        color: "black",
      };
    } else if (status === "Accepted") {
      return {
        backgroundColor: "lightblue",
        color: "darkblue",
      };
    } else if (status === "Ordered") {
      return {
        backgroundColor: "lightcoral",
        color: "darkred",
      };
    }
  };

  // UserChange
  const userSetter = () => {
    setUser(null);
  };
  //FormatCurrency
  const formatCurrency = (price) => {
    return Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price / 100);
  };

  // cart adding and removing
  const increament = (stock) => {
    if (cartValue === stock) {
      showAlert("Not More in Stock, Please Wait to buy more", true);
    }
    cartValue < stock ? setCartValue(cartValue + 1) : setCartValue(cartValue);
  };

  const decreament = () => {
    cartValue > 1 ? setCartValue(cartValue - 1) : setCartValue(cartValue);
  };

  const cartValueToZero = () => {
    setCartValue(1);
  };

  // Grid view or list view

  const changeActiveViewStyle = (cur) => {
    setActiveStyle(cur);
  };

  // sorting products

  const filterProducts = () => {
    let filtered = product;

    // Filter by category
    if (selectedCategory !== "ALL") {
      filtered =
        filtered &&
        filtered.filter((product) => product.category === selectedCategory);
    }
    // Filter by company
    if (selectedCompany !== "ALL") {
      filtered =
        filtered &&
        filtered.filter((product) => product.company === selectedCompany);
    }

    // filter By Color
    if (selectedColor !== "ALL") {
      filtered =
        filtered &&
        filtered.filter((product) => product.colors.includes(selectedColor));
    }

    // Filter by search query
    if (searchItem.trim() !== "") {
      const query = searchItem.toLowerCase();
      filtered =
        filtered &&
        filtered.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
    }

    // Filter By Price
    if (selectedPrice !== 0) {
      filtered =
        filtered &&
        filtered.filter((product) => product.price <= selectedPrice);
    }

    //Sort
    if (sortOrder === "a-z") {
      filtered = [...filtered].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortOrder === "z-a") {
      filtered = [...filtered].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (sortOrder === "h-l") {
      filtered = [...filtered].sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortOrder === "l-h") {
      filtered = [...filtered].sort((a, b) => {
        return a.price - b.price;
      });
    }

    setFilteredItems(filtered);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setButtonClicked(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleClick = (e) => {
    setSelectedColor(e.target.value);
    handleColorChange(e);
  };

  // To Show Filtered options

  const getUniqueData = (filterCategory) => {
    let uniqueData =
      product &&
      product.map((curr) => {
        return curr[filterCategory];
      });
    if (uniqueData) {
      if (filterCategory === "colors") {
        // return (uniqueData = ["ALL", ...new Set([].concat(...uniqueData))]);
        uniqueData = uniqueData.flat();
      }
      return (uniqueData = ["ALL", ...new Set(uniqueData)]);
    }
  };

  // Adding items To Cart

  const addToCart = (curElem, colorOfItem, quantity) => {
    let existingProduct =
      cartItems &&
      cartItems.find((curItem) => curItem.id === curElem.id + colorOfItem);
    if (existingProduct) {
      let updatedProduct =
        cartItems &&
        cartItems.map((curItem) => {
          if (curItem.id === curElem.id + colorOfItem) {
            let newQuantity = curItem.quantity + quantity;
            if (newQuantity >= curItem.stock) {
              newQuantity = curItem.stock;
            }
            return {
              ...curItem,
              quantity: newQuantity,
            };
          } else {
            return curItem;
          }
        });
      setCartItems(updatedProduct);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: curElem._id + colorOfItem,
          name: curElem.name,
          quantity: quantity,
          color: colorOfItem,
          price: curElem.price,
          image: curElem.image[0],
          stock: curElem.stock,
          description: curElem.description,
        },
      ]);
      setSelectedColor("ALL");
    }
  };
  const changeCartItemColor = (e) => {
    setCartItemColor(e.target.value);
  };
  const increamentOnCart = (stock, id) => {
    let updatedProduct = cartItems.map((curElem) => {
      if (curElem.id === id) {
        let incAmount = curElem.quantity + 1;

        if (incAmount > stock) {
          showAlert("Not More in Stock, Please Wait to buy more", true);
          incAmount = stock;
        }

        return {
          ...curElem,
          quantity: incAmount,
        };
      } else {
        return curElem;
      }
    });
    setCartItems(updatedProduct);
  };

  const decreamentOnCart = (id) => {
    let updatedProduct = cartItems.map((curElem) => {
      if (curElem.id === id) {
        let decAmount = curElem.quantity - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          quantity: decAmount,
        };
      } else {
        return curElem;
      }
    });
    setCartItems(updatedProduct);
  };

  const deleteItem = (id) => {
    let updatedCart = cartItems.filter((curItem) => curItem.id !== id);
    setCartItems(updatedCart);
  };

  const setTotalPriceQunat = () => {
    let cp = 0,
      cq = 0;
    cartItems &&
      cartItems.map((cur) => {
        cp = cp + cur.price * cur.quantity;
        cq = cq + cur.quantity;
      });
    setCartPrice(cp);
    setCartQuantity(cq);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const showAlert = (message, error) => {
    if (error) {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        login,
        signup,
        user,
        userSetter,
        loading,
        showAlert,
        baseUrl,
        product,
        showProducts,
        formatCurrency,
        increament,
        decreament,
        cartValue,
        cartValueToZero,
        totalCartValue,
        activeStyle,
        changeActiveViewStyle,
        filteredItems,
        searchItem,
        getUniqueData,
        selectedCompany,
        handleCategoryChange,
        handleCompanyChange,
        handleSearchChange,
        handleSortChange,
        handleColorChange,
        handlePriceChange,
        filterProducts,
        buttonClicked,
        sortOrder,
        minPrice,
        maxPrice,
        selectedPrice,
        selectedColor,
        addToCart,
        cartItems,
        increamentOnCart,
        decreamentOnCart,
        cartItemColor,
        changeCartItemColor,
        handleClick,
        deleteItem,
        cartQuantity,
        cartPrice,
        clearCart,
        onCheckOut,
        fetchOrders,
        orders,
        contact,
        showData,
        allUsers,
        deleteUserHandler,
        updateHandler,
        deleteProductHandler,
        updateProductHandler,
        addProduct,
        getOrders,
        allOrders,
        updateOrderStatus,
        bgColor,
        cancelOrder,
      }}>
      <ToastContainer />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={<Product />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdetails"
          element={<UserDetails />}
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }>
          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="users/updateUser/:id"
            element={
              <AdminRoute>
                <AdminUpdate />
              </AdminRoute>
            }
          />
          <Route
            path="products"
            element={
              <AdminRoute>
                <AdminProduct />
              </AdminRoute>
            }
          />
          <Route
            path="products/update/:id"
            element={
              <AdminRoute>
                <AdminUpdateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
          <Route
            path="new"
            element={<AdminNew />}
          />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </AppContext.Provider>
  );
}

export default App;
