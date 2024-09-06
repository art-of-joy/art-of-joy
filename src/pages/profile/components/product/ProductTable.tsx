import React from 'react';
import {InputText} from "../../../../shared/ui/formItems/InputText";
import {Table} from "../../../../shared/ui/Table";
import {AddProductPhoto} from "./AddProductPhoto";

const ProductTable = () => {
    return (
        <Table
            id={'excel'}
            fields={
                [
                    {name: 'product-edit', type: 'edit' },
                    {name: 'select', type: 'select'},
                    {name: 'product-photo', title: 'Фото', colWidth: {unit: 'px', value: 130}, createRecord(record: Record<string, any>) {
                        return (
                            <AddProductPhoto imagesData={record.imagesData ?? []}/>
                        )
                    }},
                    {name: 'article', title: 'Артикул'},
                    {name: 'article_wb', title: 'Артикул с WB'},
                    {name: 'color', title: 'Цвет'},
                    {name: 'name', title: 'Название'},
                    {name: 'size', title: 'Размер'},
                    {name: 'description', title: 'Описание', colWidth: {value: 600, unit: 'px'} },
                    {name: 'ru_size', title: 'Размер РФ'},
                    {name: 'subcategoryName', title: 'Подкатегория'},
                ]
            }
            canDragRecords={true}
        />
    );
};

export default ProductTable;