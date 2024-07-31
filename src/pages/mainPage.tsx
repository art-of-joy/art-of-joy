import React from 'react';
import {Header} from "../widgets/header/header";
import {Page} from "../shared/ui/Page/ui";
import {AddProduct} from "../features/addProduct/ui";
import {Table} from "../shared/ui/Table";
import {InputText} from "../shared/ui/formItems/InputText";

export const MainPage = () => {
    return (
        <Page>
            <Header/>
            <AddProduct></AddProduct>
            <Table
                id={'excel'}
                fields={[
                    {name: 'article', title: 'Артикул', createRecord(record: Record<string, any>): React.ReactNode | undefined {
                        console.log('Пипка')
                        return (<>
                            <InputText value={record['article']}/>
                        </>)
                        }},
                    {name: 'article_wb', title: 'Артикул с WB'},
                    {name: 'color', title: 'Цвет'},
                    {name: 'name', title: 'Название'},
                    {name: 'size', title: 'Размер'},
                    {name: 'description', title: 'Описание', colWidth: {value: 700, unit: 'px'} },
                    {name: 'ru_size', title: 'Размер РФ'},
                    {name: 'subcategoryName', title: 'Подкатегория'},
                ]}
                canSelected={true}
            ></Table>
        </Page>
    );
};

