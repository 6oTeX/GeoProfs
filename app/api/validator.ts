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

        this.params.forEach(param => {
            const check = this.validateParam(param);
            if (!check.success)
            {
                success = false;
                errors = errors.concat(check.errors)
            }
        });

        return { success, errors };
    }

    private validateParam(param: RequestParameter): {success: boolean, errors: string[]}
    {
        const value = this.search_params.get(param.name);
        console.log(param.name,"=", value)
        let success: boolean = true;
        let errors: string[] = [];

        // check if the value is set when required
        if (!value && param.required)
        {
            success = false;
            errors.push(`Parameter "${param.name}" is required`);
        }

        return {success, errors};
    }
}


export default RequestValidator;