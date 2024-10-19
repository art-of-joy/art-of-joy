import React from 'react';
import {Table} from "../../../../shared/ui/Table";
import {AddProductPhoto} from "./AddProduct/AddProductPhoto";

const ProductTable = () => {
    return (
        <Table
            id={'excel'}
            classNames={{
                cell: {style: {maxHeight: 150}}
            }}
            fields={
                [
                    {name: 'product-edit', type: 'edit' },
                    {name: 'select', type: 'select'},
                    {name: 'product-photo', title: 'Фото', colWidth: {unit: 'px', value: 130}, createRecord(record: Record<string, any>, index) {
                        return (
                            <AddProductPhoto record={record} index={index} imagesData={record.imagesData ?? []}/>
                        )
                    }},
                    {name: 'article', title: 'Артикул'},
                    {name: 'article_wb', title: 'Артикул с WB'},
                    {name: 'color', title: 'Цвет'},
                    {name: 'name', title: 'Название'},
                    {name: 'size', title: 'Размер'},
                    {name: 'description', title: 'Описание', colWidth: {value: 45, unit: '%'} },
                    {name: 'ru_size', title: 'Размер РФ'},
                    {name: 'subcategoryName', title: 'Подкатегория'},
                ]
            }
        />
    );
};

export default ProductTable;