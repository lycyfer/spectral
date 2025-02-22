import { Suspense } from "react"
import { Await, useLoaderData } from "react-router-dom"
import Venus from "../venues/venues"


const VenuesLoader = () => {

    const data = useLoaderData()
    return (
        <div>
            <Suspense>
                <Await
                resolve={data.hallsResponse}
                errorElement={<p>Error loading posts!</p>}>
                    {(hallsPromise) => <Venus items={hallsPromise.data}/>}
                </Await>
            </Suspense>
        </div>
    )

}

export default VenuesLoader