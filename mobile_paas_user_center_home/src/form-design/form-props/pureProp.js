const commonProp = {
  // labelWidth: '110px',
  i18nLabel: 1,
  width: '100%',
  display: 'block',
  size: 'mini',
  labelShown: 1,
  labelAlign: 'left',
  labelShown: 1,
  paddingRight: '8px',
}
export default prop => {
  return { ...commonProp, ...prop }
}
