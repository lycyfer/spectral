import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const getHalls = async () => {
    const hallsPromise = await apiRequest("/hall/get");
    console.log(hallsPromise);
    return defer({
        hallsResponse: hallsPromise,
    });
};

export const getHallById = async ({ request, params }) => {
    console.log(params.id)
    const hallPromise = await apiRequest(`hall/get/` + params.id)
    console.log(hallPromise)
    return defer({
        hallsResponse: hallPromise
    })
}

export const adminLoader = async () => {
    // const hallsPromise = await apiRequest("/hall/get")
    const bookingPromise = await apiRequest("/booking/get")

    return defer({
        // hallsResponse: hallsPromise,
        bookingResponse: bookingPromise,
    })
}
