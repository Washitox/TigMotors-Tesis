import {create} from "zustand";

const useDatosStore = create ((set) => ({
    // const [data, setData] = useState([])
    data: [],
    // setData: (datos) => set({data: datos})
    setData: (datos) => set ({data: datos})
}))

export default useDatosStore