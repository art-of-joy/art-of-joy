import {store} from "../../../lib/store/store";
import {deleteElem} from "../../../lib/store/slices/uiSlice";

export const clearStore = () => {
    Object.keys(store.getState().ui).forEach(id => {
        store.dispatch(deleteElem({id}));
    })
}