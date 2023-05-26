import axios from "axios";

export const RequestModel = () => ({
    request: async (URL, method, dataCall, headers, cache) => {

        let responseReturn;
        await axios({
            url: urlencode(URL),
            method: method,
            data: dataCall,
            headers: headers
        }).then((response) => {
            responseReturn = response.data;
        }, (error) => {
            console.error(error)
        });
        return responseReturn;

    }
});

