import {
  faUsers,
  faUserPlus,
  faTags,
  faTag,
  faBoxOpen,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: "1995",
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faUserPlus,
    role: "1995",
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faTags,
    role: ["1995", "1999"],
  },
  {
    name: "Add Category",
    path: "/dashboard/category/add",
    icon: faTag,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faBoxOpen,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "/dashboard/product/add",
    icon: faCartPlus,
    role: ["1995", "1999"],
  },
];
