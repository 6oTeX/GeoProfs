import { isDate } from "util/types";

interface RequestParameter {
    name: string;
    required: boolean;
    type: string;
}

/**
 * @brief a request validator
 */
class RequestValidator {

    private request: Request;
    private params: RequestParameter[];
    private search_params: URLSearchParams;

    /**
     * @brief constructor
     * 
     * @param request 
     * @param params 
     */
    constructor(request: Request, params: RequestParameter[])
    {
        this.request = request;
        this.params = params;
        this.search_params = new URL(request.url).searchParams;
    }
    /**
     * @brief checks if all parameters are valid
     * 
     * @returns 
     */
    public valid() {
        let errors: string[] = [];
        let success = true;

        for (let index = 0; index < this.params.length; index++) {
            const element = this.params[index];

            if (element.required)
            {
                const value = this.search_params.get(element.name); 
                if (value == null)
                {
                    errors.push("Parameter: '" + element.name +  "' is required");
                    success = false;
                }

                if (element.type == "date")
                {
                    const unixNumb: number = value ? +value : 0;
                    const date = new Date(value ? value : "0");
                    console.log(date.toString());
                    
                }
            }
        }

        return { success, errors };
    }
}


export default RequestValidator;