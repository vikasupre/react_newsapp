import { createContext } from "react";

const Context = createContext()
export { Context };

export default function Mycontext(props) {
    const state = { 'name': 'vikas' }
    return (
        <Context.Provider value={state}>
            {props.children}
        </Context.Provider>
    )
}
