import { createContext, useReducer, useContext } from 'react'
import { Equipment } from "@/types/equipment";

type Action =
    | { type: 'setState', value: Equipment[] }
    | { type: 'replaceIndex', index: number, value: Equipment }
    | { type: 'dropIndex', index: number }
    | { type: 'appendValue', value: Equipment };

type ViewItemispatch = (action: Action) => void;
type ItemViewState = { displayItems: Equipment[] };
type ViewItemProviderProps = { children: React.ReactNode };

const ViewItemContext = createContext<
    | {
        state: ItemViewState;
        dispatch: ViewItemispatch;
    }
    | undefined
>(undefined);

function stateReducer(state: ItemViewState, action: Action): ItemViewState {
    switch (action.type) {
        case 'setState': {
            return { displayItems: action.value };
        }
        case 'replaceIndex': {
            const shiftArray = Array.from(state.displayItems)
            shiftArray.splice(action.index, 1, action.value)
            return { ...state, displayItems: shiftArray }
        }
        case 'dropIndex': {
            const shiftArray = Array.from(state.displayItems)
            shiftArray.splice(action.index, 1)
            return { ...state, displayItems: shiftArray }
        }
        case 'appendValue': {
            return { ...state, displayItems: [...state.displayItems, action.value] }
        }
    }
}

function ViewItemProvider({ children }: ViewItemProviderProps) {
    const [state, dispatch] = useReducer(stateReducer, { displayItems: [] });
    const contextValue = { state, dispatch };

    return (
        <ViewItemContext.Provider value={contextValue}>
            {children}
        </ViewItemContext.Provider>
    );
}

function useViewItemProvider() {
    const context = useContext(ViewItemContext);
    if (context === undefined) {
        throw new Error('useViewItemProvider must be used within a ViewItemProvider');
    }
    return context;
}

export { ViewItemProvider, useViewItemProvider }