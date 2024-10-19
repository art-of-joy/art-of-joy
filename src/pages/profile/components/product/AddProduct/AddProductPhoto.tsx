import React from 'react';
import {readFileAsArrayBuffer, readFileAsDataURL} from "../../../../../features/files/fileReader";
import {InputFile} from "../../../../../shared/ui/formItems/inputFile";
import {Slider} from "../../../../../shared/ui/Slider/ui";
import styles from './AddProductPhoto.scss'
export type ProductImageData = {
    binary?: Uint8Array
    dataUrl?: string
    error?: string
    fileName?: string
}

export type ProductImageProps = {
    imagesData: ProductImageData[]
    record: Record<string, any>
    index: number
}

export const AddProductPhoto: React.FC<ProductImageProps> = ({  imagesData, record, index }) => {
    const [filesArray, setFilesArray] = React.useState<ProductImageData[]>([]);
    const handleFileChange = async (files: FileList | undefined | null) => {
        const newFilesArray: ProductImageData[] = []
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.startsWith('image/')) {
                    try {
                        // Получаем URL для отображения изображения
                        const dataUrl = await readFileAsDataURL(files[i]);


                        // Получаем массив байт для отправки на сервер
                        const arrayBuffer = await readFileAsArrayBuffer(files[i]);
                        const uint8Array = new Uint8Array(arrayBuffer);

                        newFilesArray.push({
                            dataUrl,
                            binary: uint8Array,
                            fileName: files[i].name,
                        })
                    } catch {
                        newFilesArray.push({
                            error: 'Ошибка при чтении файла №' + (i+1),
                        })
                    }
                } else {
                    newFilesArray.push({
                        error: 'Неправильный формат файла №' + (i+1),
                    })
                }
            }
        }
        setFilesArray(newFilesArray)
    };

    return (
        <React.Fragment>
            {
                filesArray.length === 0 ? (
                    <InputFile id={'addPhoto'+index} onChangeInput={(files) => handleFileChange(files)}/>) :
                    (
                        <React.Fragment>
                            <Slider>
                                {filesArray.map((data, index) => {
                                    return (
                                        <img className={styles.addProduct__image} alt={data.fileName} key={'imageData'+index} src={data.dataUrl} />
                                    )
                                })}
                            </Slider>
                        </React.Fragment>

                    )
            }

        </React.Fragment>
    );
};

