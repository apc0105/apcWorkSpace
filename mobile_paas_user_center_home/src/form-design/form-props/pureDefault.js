import uuid from '@/form-design/utils/uuid'
const defaultValue = {
  key: uuid(16),
  display: 'block',
  width: '100%',
  labelWidth: '100px',
  labelShown: 1,
  shown: 1,
  readonly: 0,
  size: 'medium',
  marginTop: '-1px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  paddingTop: '0px',
  paddingRight: '8px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  placeholder: '请输入',
}
export default (config, value) => {
  const formConfig = {
    width: config.width,
    labelAlign: config.labelAlign,
    labelWidth: config.labelWidth,
    controlBgColor: config.controlBgColor,
    controlBorderColor: config.controlBorderColor,
    controlBorderWidth: config.controlBorderWidth,
    controlBorderStyle: config.controlBorderStyle,
    controlBorderRadius: config.controlBorderRadius,
  }
  return { ...defaultValue, ...formConfig, ...value, key: uuid(16) }
}
