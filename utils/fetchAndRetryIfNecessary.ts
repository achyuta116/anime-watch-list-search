function getMillisToSleep(retryHeaderString: string) {
    let millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000)
    if (isNaN(millisToSleep)) {
        millisToSleep = Math.max(0, new Date(retryHeaderString).getTime() - new Date().getTime())
    }
    return millisToSleep
}
function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function fetchAndRetryIfNecessary(callAPIFn: (
    onfulfilled?: ((value: any) => any) | null | undefined, 
    onrejected?: ((reason: any) => any) | null | undefined) => Promise<any>): Promise<Response> {
    const response = await callAPIFn()
    console.log(response)
    if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after')
        const millisToSleep = getMillisToSleep(retryAfter)
        await sleep(millisToSleep)
        return fetchAndRetryIfNecessary(callAPIFn)
    }
    return response
}

