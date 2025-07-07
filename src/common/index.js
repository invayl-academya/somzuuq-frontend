export const registerFormControls = [
  {
    name: "name",
    label: "name",
    placeholder: "enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "username",
    label: "username",
    placeholder: "Your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter Your  Password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter Your  Password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "sportswear", label: "Sportswear" }, // ✅ added
      { id: "electronics", label: "Electronics" }, // ✅ added
      { id: "home", label: "Home & Living" }, // ✅ added
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
      { id: "ymc", label: "invayl" },
      { id: "uniqlo", label: "Uniqlo" }, // ✅ added
      { id: "underarmour", label: "Under Armour" }, // ✅ added
      { id: "gucci", label: "Gucci" }, // ✅ added
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "countInStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "sportswear", label: "Sportswear" },
    { id: "electronics", label: "Electronics" },
    { id: "home", label: "Home & Living" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "ymc", label: "invayl" },
    { id: "uniqlo", label: "Uniqlo" },
    { id: "underarmour", label: "Under Armour" },
    { id: "gucci", label: "Gucci" },
  ],
};

export const sortOptions = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "From: A to Z" },
  { id: "name-desc", label: "From: Z to A" },
];
