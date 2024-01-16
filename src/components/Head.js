import React from "react";
import Searchbar from "./Searchbar";
import logo from "../images/logo.svg";

const Head = () => {
  return (
    <div className="grid w-full h-screen grid-cols-12 py-6 bg-purple-900">
      <div className="col-span-2">
        <img src={logo} alt="logo" className="px-2 ml-8 w-28" />
      </div>
      <div className="col-span-8">
        <Searchbar />
      </div>
      <div className="col-span-2">
        <div className="h-12 px-2 py-2 pl-2 ml-10 font-bold text-white bg-red-500 rounded-lg w-36">
          {/* <Button variant="text" startIcon={<RemoveShoppingCartIcon />}> */}
          🛒 MyCart
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Head;
