import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Authentication from "./components/Authentication.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import EmailVerification from "./components/EmailVerification.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Book from "./pages/Book.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import BorrowedBooks from "./pages/BorrowedBooks.jsx";
import ReturnedBooks from "./pages/ReturnedBooks.jsx";
import UploadBook from "./pages/UploadBook.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import WishlistBooks from "./pages/WishlistBooks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "authentication",
        element: <Authentication />,
        children: [
          {
            path: "signup",
            element: (
              <AuthGuard authentication={false}>
                <Register />
              </AuthGuard>
            ),
          },
          {
            path: "login",
            element: (
              <AuthGuard authentication={false}>
                <Login />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "email-verification/:email",
        element: (
          <AuthGuard authentication={false}>
            <EmailVerification />
          </AuthGuard>
        ),
      },
      {
        path: "book/:bookId",
        element: (
          <AuthGuard authentication={true}>
            <Book />
          </AuthGuard>
        ),
      },
      {
        path: "my-books",
        element: (
          <AuthGuard authentication={true}>
            <MyBooks />
          </AuthGuard>
        ),
      },
      {
        path: "my-borrowed-books",
        element: (
          <AuthGuard authentication={true}>
            <BorrowedBooks />
          </AuthGuard>
        ),
      },
      {
        path: "my-returned-books",
        element: (
          <AuthGuard authentication={true}>
            <ReturnedBooks />
          </AuthGuard>
        ),
      },
      {
        path: "add-book",
        element: (
          <AuthGuard authentication={true}>
            <UploadBook />
          </AuthGuard>
        ),
      },
      {
        path: "my-waiting-list",
        element: (
          <AuthGuard authentication={true}>
            <WishlistBooks   />
          </AuthGuard>
        )
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
