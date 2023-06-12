import { useEffect, useState, useRef } from 'react'

import { EquipmentBlock } from '@/components/equipment-block'
import { APIGetEquipment } from "@/types/equipment";
import { useViewItemProvider } from '@/context/view-item';

function usePrevious<T>(value: T) {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

const MoreButton = (props: { appendItem: () => void, disabled: boolean }) => {
    return <button
        disabled={props.disabled}
        onClick={props.appendItem}
        css={{ padding: '0px 24px', fontSize: '24px', border: '0' }}>
        +
    </button>
}

export function EquipmentList(props: { loading: boolean, serverState: APIGetEquipment | undefined, serverRefetch: () => void, setTotalValue: (arg0: number) => void }) {
    const { serverState, setTotalValue, serverRefetch } = props
    const { state, dispatch } = useViewItemProvider()

    const [statePointer, setStatePointer] = useState(0)

    /* Set view state when server state changes */
    useEffect(() => {
        const setLength = state.displayItems.length || 5
        // Check if not undefined AND that the pointer hasn't moved indicating a refresh
        if (typeof serverState?.equipment !== 'undefined' && state.displayItems.length === 0) {
            dispatch({ type: 'setState', value: serverState.equipment.slice(0, setLength) })
            setStatePointer(setLength)
        }
    }, [dispatch, serverState, state.displayItems.length])

    /* Calculate total price of all visible items */
    useEffect(() => {
        const totalValue = state.displayItems.reduce((acc, cur) => {
            return (acc + cur.price! ?? 0)
        }, 0)
        setTotalValue(totalValue)
    }, [state, setTotalValue])

    useEffect(() => {
        if (typeof serverState !== 'undefined' && serverState.equipment.length === statePointer) {
            setStatePointer(0)
            serverRefetch()
        }
    }, [serverState, statePointer, serverRefetch])

    /**
     * Button function to add new viewable item to the view state
     */
    const appendItem = () => {
        const nextItem = serverState?.equipment.at(statePointer)
        if (typeof nextItem !== 'undefined') {
            dispatch({ type: 'appendValue', value: nextItem })
            setStatePointer((oldState) => ++oldState)
        }
    }

    /**
     * Button function to replace item at a given index for view state
     * @param index Current index to be replaced
     */
    const replaceItem = (index: number) => {
        const nextItem = serverState?.equipment.at(statePointer)

        if (typeof nextItem !== 'undefined') {
            dispatch({ type: 'replaceIndex', value: nextItem, index: index })
            setStatePointer((oldState) => ++oldState)
        }
    }

    /**
     * Trigger total refresh of all visible data
     */
    const refreshData = () => {
        console.log('Refresh Triggered')
        props.serverRefetch()
        dispatch({ type: 'setState', value: [] })
    }

    if (props.loading) {
        return <div>Loading...</div>
    }

    if (state.displayItems.length === 0) {
        return <div>
            <button onClick={() => { refreshData }} css={{ border: '0', padding: '0px 24px', fontSize: '24px' }}>↻</button>
            No Items
        </div>
    }

    return <div css={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {state.displayItems.map((item, index) => (<EquipmentBlock key={index} equipment={item} index={index} refreshItem={() => { replaceItem(index) }} />))}
        <div css={{ display: 'flex', gap: '8px' }}>
            <button onClick={refreshData} css={{ border: '0', padding: '0px 24px', fontSize: '24px' }}>↻</button>
            <MoreButton appendItem={appendItem} disabled={state.displayItems.length >= 10} />
        </div>
    </div>

}