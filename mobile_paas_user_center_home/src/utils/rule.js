
// 行栅格化
//50%
export function colItemLayoutHalf(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    xxl:12
  }
}

export function colItemLayoutAbsolutely(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl:24,
    xxl:24
  }
}


// 后期进行优化
//12
export function colItemLayout12(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    xxl:12
  }
}
// 表单栅格化
export function formItemLayout12(){
  return {
    labelCol: {
      xs: { span: 3 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 21 },
      sm: { span: 21 },
    },
  }
} 
//16
export function colItemLayout16(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 16,
    xxl:16
  }
}
export function formItemLayout16(){
  return {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
      md: { span: 2 },
      lg: { span: 3 },
      xl: { span: 3 },
      xxl: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 22 },
      lg: { span: 21 },
      xl: { span: 21 },
      xxl: { span: 21 },
    },
  }
}
// 8
export function colItemLayout8(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 8,
    xxl:8
  }
}
export function formItemLayout8(){
  return {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 20 },
    },
  }
}
// 24
export function colItemLayout24(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl:24,
    xxl:24
  }
}
export function formItemLayout24(){
  return {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 22 },
    },
  }
}
// 6
export function colItemLayout6(){
  return {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl:8,
    xxl:6
  }
}
export function formItemLayout6(){
  return {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 16 },
      xl: { span: 6 },
      xxl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
      md: { span: 18 },
      lg: { span: 18 },
      xl: { span: 18 },
      xxl: { span: 18 },
    },
  }
}
// 表单栅格化
export function formItemLayout(){
  return {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 20 },
    },
  }
}
export function formItemLayoutHalf(){
  return {
    labelCol: {
      xs: { span: 3 },
      sm: { span: 3 },
      md: { span: 3 },
      lg: { span: 3 },
      xl: { span: 3 },
      xxl: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 21 },
      sm: { span: 21 },
      md: { span: 21 },
      lg: { span: 21 },
      xl: { span: 21 },
      xxl: { span: 21 },
    },
 }
} 
// 必填项
export function requiredRule(val){
  const rule = [
    {
      required: true,
      message: val,
    },
  ]
  return rule

}
// 纯数字
export function numRule (val) {
  return [
    { pattern: '^[0-9]+$|^[0-9]*.[0-9]+$', message: `请输入正确的${val}` },
    {
      required: true,
      message: `请输入${val}`
    }

  ]
}
const pwdValidator = (rule, value, callback) => {
  const Rule = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,20}$/.test(value)
  if (!Rule) {
    callback('数字,字母,字符至少包含两种,不能包含中文和空格 !')
  }

  // 必须总是返回一个 callback，否则 validateFields 无法响应
  callback();
}
// 密码校验
export function pwdRule(){
  return [
    {
      required: true,
      message: '请输入密码',
    },
    {
      validator: pwdValidator
    },
  ]
}

// 邮件
export function emailRule(){
  return [
    {
      type: 'email',
      message: '请输入正确的邮件地址',
    },
    {
      required: true,
      message: '请输入邮件地址',
    },
  ]
}
// 手机号
export function phoneRule(){
  return [
    {
      required: true,
      message: '请输入手机号!',
    },
    {
      pattern: /^1\d{10}$/,
      message: '错误的手机号!',
    },
  ]
}
// 密码
export function passwordRule(){
  return [
    {
      required: true,
      message: '请输入密码!',
    },
  ]
}
// 密码
export function numberRule(){
  return [
    
    {
      required: true,
      message: '请输入排序!',
    },
    
  ]
}