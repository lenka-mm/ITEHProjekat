import React, { useEffect, useState } from "react";
import axios from 'axios'
import { serverUrl } from "../constants";

export default function useFetch<T>(path: string) {
    const [state, setState] = useState<T[]>([]);

    useEffect(() => {
        axios.get(serverUrl + path).then(res => {
            setState(res.data);
        })
    }, [path])
    return [state, setState] as const;

}