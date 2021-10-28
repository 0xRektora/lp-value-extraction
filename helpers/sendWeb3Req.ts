/**
 * Retry a request if it's timed out due to congestion.
 * Need to be wrapped inside an async function 
 * 
 * @param req The web3 req to send
 * @returns The web3 result
 */
const sendWeb3Req = async <T>(req: () => Promise<T>): Promise<T> => {
    try {
        return await req()
    } catch (err: any) {
        if (err.message.includes("timeout") || err.message.includes("timed out")) {
            console.log(`Timeout, retying : ${err.message}`);
            return await sendWeb3Req(req)
        } else {
            console.log(`Uknown error: ${err.message}`);
            return await req()
        }
    }
}

export default sendWeb3Req