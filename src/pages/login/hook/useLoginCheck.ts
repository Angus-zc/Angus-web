type Key = Exclude<keyof any, symbol>

type UseLoginCheck = (username: Key, password: Key, confirmPassword: Key) => {
    flag: boolean,
    message: string
}

const isEmpty = (info: Key) => {
    return info === '' 
}

const loginCheck:UseLoginCheck = (usename: Key, password: Key, confirmPassword: Key) => {
    if (isEmpty(usename) || isEmpty(password) || isEmpty(confirmPassword)) {
        return {
            flag: false,
            message: '信息不能为空！'
        }
    }

    if (password !== confirmPassword) {
        return {
            flag: false,
            message: '两次输入的密码不同！'
        }
    }

    return {
        flag: true,
        message: '注册成功！'
    }
}

export default loginCheck