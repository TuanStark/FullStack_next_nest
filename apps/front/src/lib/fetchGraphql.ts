import { BACKEND_URL } from "./constants";


export const fetchGraphql = async (query: string, variables = {}) => {
    const res = await fetch(`${BACKEND_URL}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables
        }),
    });

    const result = await res.json();
    if (result.error) {
        console.error('Graphql errors:', result.error);  // Log the error in the console for debugging purposes.  Remove this line in production.
        throw new Error("Failed to fetch the data from GraphQL");
    }

    return result.data;
};