import {dataSourceInterface} from "../model/types";
import {store} from "../../../lib/store/store";
import {defaultDataSource} from "../model/const";
import {createElem} from "../../../lib/store/slices/uiSlice";
import {getInnerProps} from "../../../lib/store/utils/assignProps";

export const DataSource = (props:dataSourceInterface) => {
    let assignedProps = getInnerProps(defaultDataSource, props);
    store.dispatch(createElem(assignedProps));
}