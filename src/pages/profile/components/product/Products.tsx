import React from 'react';
import ProductTable from "./ProductTable";
import SelectExcel from "./SelectExcel";

const Products = () => {
    return (
        <React.Fragment>
            <SelectExcel/>
            <ProductTable/>
        </React.Fragment>
    );
};

export default Products;