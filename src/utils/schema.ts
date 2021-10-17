import { Key } from "../config/componentTypes"
import Ajv from 'ajv'

const ajv = new Ajv()

const valid = (schema: any, config: Record<Key, any>): {
    isValid: boolean,
    message: string
} => {

    const isValid = ajv.validate(schema, config) as boolean
    let message = 'success!' as string
    if (!isValid) {
        message = ajv.errors![0].message as string
        console.log(message)
    }
    return { isValid, message }

}
export default valid