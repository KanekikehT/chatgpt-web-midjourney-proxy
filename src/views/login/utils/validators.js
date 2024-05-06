// views/login/utils/validators.js
function validatePhoneNumber(phoneNumber) {
  const regex = /^1[3-9]\d{9}$/;
  if (!phoneNumber) {
    return { errorMessage: '手机号不能为空' };
  } else if (!regex.test(phoneNumber)) {
    return { errorMessage: '请输入有效的手机号码' };
  } else {
    return { errorMessage: '' };
  }
}

function validatePassword(password) {
  if (!password) {
    return { errorMessage: '密码不能为空' };
  } else if (password.length < 6) {
    return { errorMessage: '密码长度不能少于6位' };
  } else {
    return { errorMessage: '' };
  }
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return { errorMessage: '确认密码不能为空' };
  } else if (password !== confirmPassword) {
    return { errorMessage: '两次输入的密码不一致' };
  } else {
    return { errorMessage: '' };
  }
}

function validateCode(code) {
  if (!code) {
    return { errorMessage: '验证码不能为空' };
  }
  return { errorMessage: '' };
}

/**
 * 动态验证表单字段。
 * 
 * @param {string} fieldName - 需要验证的字段名称。
 * @param {string} checkParameters - 验证字段所需的参数或值。
 * @returns {object} 返回验证结果，包含可能的错误消息。
 */
export function handleBlur(fieldName, checkParameters) {
  // 验证函数映射
  const validationMap = {
    confirmPassword: validateConfirmPassword,
    phoneNumber: validatePhoneNumber,
    password: validatePassword,
    code: validateCode
  };

  let result;

  // 确保 checkParameters 已定义并且是字符串类型
  if (typeof checkParameters !== 'string') {
    return { errorMessage: '请输入密码' };
  }

  // 特殊处理确认密码的情况，需要分割参数
  if (fieldName === 'confirmPassword') {
    const parameters = checkParameters.split(';');
    if (parameters.length < 2) {
      return { errorMessage: '请输入密码' };
    }
    const [firstPassword, secondPassword] = parameters;
    result = validationMap[fieldName](firstPassword, secondPassword);
  } else {
    // 通用处理其他字段
    result = validationMap[fieldName] ? validationMap[fieldName](checkParameters) : { errorMessage: '未知字段' };
  }

  return result.errorMessage;
}
