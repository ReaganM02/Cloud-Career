function displayError({ statusCode, cause }: { statusCode: number, cause: string | object }) {
    return createError({ statusCode, data: { cause } })
}

export default displayError