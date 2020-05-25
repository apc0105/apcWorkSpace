import {requiredRule,colItemLayoutHalf,formItemLayout} from '@/utils/rule'
export const applicationService =[
  {
    label:'流程名称',
    type:'input',
    colItemLayout:colItemLayoutHalf(),
    formItemLayout:formItemLayout(),
    decorator:['name', {rules:requiredRule('请输入流程模型名称'),initialValue:''}]
  }
  
]
