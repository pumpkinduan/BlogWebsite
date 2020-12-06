// ======= validate-xx 适用于antd的form表单的相关验证信息 ======
export interface validatorResultProps {
    status: boolean;
    msg: string;
    email?: boolean;
    phoneNumber?: boolean;
}
// 密码包含 数字,英文,字符中的两种以上，长度6-20
export const pwdReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;

// 用户名至少包含 中文，数字和英文中的一种，且数字不能开头，长度4-12
export const usernameReg = /^(?![0-9])[\u4e00-\u9fa5_a-zA-Z0-9_]/;

// 非法字符
const illegalCharReg = /[&\\"$'<>`|]/;

// 邮箱
const emailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
export const validateIllegalChar = (value: string): validatorResultProps => {
    if (illegalCharReg.test(value)) {
        return {
            status: false,
            msg: "不能输入特殊字符 &\"$'`| <>",
        };
    }
    return {
        status: true,
        msg: "",
    };
};

// 密码验证信息
export const validatePwd = (value: string): validatorResultProps => {
    const number_reg = /[0-9]+/g,
        lower_reg = /[a-z]+/g,
        upper_reg = /[A-Z]+/g;
    if (!value)
        return {
            status: false,
            msg: "请输入您的密码",
        };
    if (!number_reg.test(value))
        return {
            status: false,
            msg: "密码必须包含数字",
        };
    if (!lower_reg.test(value))
        return {
            status: false,
            msg: "密码必须包含小写字母",
        };
    if (!upper_reg.test(value))
        return {
            status: false,
            msg: "密码必须包含大写字母",
        };
    if (value.length < 8 || value.length > 63)
        return {
            status: false,
            msg: "密码长度不得小于8位",
        };
    return {
        status: true,
        msg: "",
    };
};

// 不能输入特殊字符 &\"$'`| <>
// 用户名至少包含 中文，数字和英文中的一种，且数字不能开头，长度4-12
export const validateUserName = (value: string): validatorResultProps => {
    const res = validateIllegalChar(value);
    if (!res.status) {
        return res;
    }
    if (value.length < 4 || value.length > 12) {
        return {
            status: false,
            msg: "用户名长度为4-12位",
        };
    }
    return {
        status: true,
        msg: "",
    };
};

export const validateEmail = (value: string): validatorResultProps => {
    if (!emailReg.test(value)) {
        return {
            msg: "请输入有效的邮箱",
            status: false,
        };
    }
    return {
        status: true,
        msg: "",
    };
};
