import pureProp from './pureProp'

const LABEL_ALIGN_OPTIONS = [
  { key: 'left', label: 'label.flow.formdesign.labelalign.left', },
  { key: 'right', label: 'label.flow.formdesign.labelalign.right', },
  { key: 'top', label: 'label.flow.formdesign.labelalign.top', },
]
const SIZE_OPTIONS = [
  { key: 'large', label: 'label.flow.formdesign.sizes.large', },
  { key: 'medium', label: 'label.flow.formdesign.sizes.medium', },
  { key: 'small', label: 'label.flow.formdesign.sizes.small', },
  { key: 'mini', label: 'label.flow.formdesign.sizes.mini', },
]

const DISPLAY_OPTIONS = [
  { key: 'block', label: 'label.flow.formdesign.display.block', },
  { key: 'inline-block', label: 'label.flow.formdesign.display.inline-block', },
]

const BORDER_STYLE_OPTIONS = [
  { key: 'none', label: 'label.flow.formdesign.borderstyles.none', },
  { key: 'solid', label: 'label.flow.formdesign.borderstyles.solid', },
  { key: 'dashed', label: 'label.flow.formdesign.borderstyles.dashed', },
]
const WIDTH = pureProp({
  type: 'fd-input', name: 'label.flow.formdesign.props.width', required: 1, min: 0, max: 100, suffixFormat: '%',
  onChange: (val, vo) => {
    if (val != '100%' && (vo.marginRight == '0px' || !vo.marginRight)) {
      vo.marginRight == '-1px'
    }
  }
})
const LABEL_WIDTH = pureProp({
  type: 'fd-input',
  name: 'label.flow.formdesign.props.labelWidth',
  number: 1,
  required: 1,
  suffixFormat: 'px'
})
const LABEL_ALIGN = pureProp({
  type: 'fd-radio',
  name: 'label.flow.formdesign.props.labelAlign',
  options: LABEL_ALIGN_OPTIONS,
  required: 1,
  itemBtnStyle: 1,
  valueProp: 'key',
  labelProp: 'label',
  defaultValue: 'left'
})
const LABEL_SHOWN = pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.labelShown' })
const SIZE = pureProp({
  type: 'fd-radio',
  name: 'label.flow.formdesign.config.size',
  options: SIZE_OPTIONS,
  itemBtnStyle: 1,
  valueProp: 'key',
  labelProp: 'label',
  defaultValue: null
})

const CONTROL_BG_COLOR = pureProp({ type: 'fd-color', name: 'label.flow.formdesign.config.controlBgColor', alpha: 1 })
const CONTROL_BORDER_WIDTH = pureProp({
  type: 'fd-input',
  name: 'label.flow.formdesign.config.controlBorderWidth',
  number: 1,
  suffixFormat: 'px'
})
const CONTROL_BORDER_RADIUS = pureProp({
  type: 'fd-input',
  name: 'label.flow.formdesign.config.controlBorderRadius',
  number: 1,
  suffixFormat: 'px'
})
const CONTROL_BORDER_COLOR = pureProp({
  type: 'fd-color',
  name: 'label.flow.formdesign.config.controlBorderColor',
  alpha: 0
})
const CONTROL_BORDER_STYLE = pureProp({
  type: 'fd-radio',
  name: 'label.flow.formdesign.config.controlBorderStyle',
  options: BORDER_STYLE_OPTIONS,
  itemBtnStyle: 1,
  valueProp: 'key',
  labelProp: 'label',
  defaultValue: 'none'
})

const MARGIN = {
  marginTop: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.marginTop',
    number: 1,
    suffixFormat: 'px'
  }),
  marginBottom: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.marginBottom',
    number: 1,
    suffixFormat: 'px'
  }),
  marginLeft: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.marginLeft',
    number: 1,
    suffixFormat: 'px'
  }),
  marginRight: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.marginRight',
    number: 1,
    suffixFormat: 'px'
  }),
}

const PADDING = {
  paddingTop: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.paddingTop',
    number: 1,
    suffixFormat: 'px'
  }),
  paddingBottom: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.paddingBottom',
    number: 1,
    suffixFormat: 'px'
  }),
  paddingLeft: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.paddingLeft',
    number: 1,
    suffixFormat: 'px'
  }),
  paddingRight: pureProp({
    type: 'fd-input',
    name: 'label.flow.formdesign.props.paddingRight',
    number: 1,
    suffixFormat: 'px'
  }),
}


export default {
  layout: {
    type: 'prop-object',
    name: 'label.flow.formdesign.props.layout',
    visible: false,
    props: {
      size: SIZE,
      width: WIDTH,
      labelWidth: LABEL_WIDTH,
      labelShown: LABEL_SHOWN,
      display: pureProp({
        type: 'fd-radio',
        name: 'label.flow.formdesign.props.display',
        options: DISPLAY_OPTIONS,
        itemBtnStyle: 1,
        valueProp: 'key',
        labelProp: 'label',
        defaultValue: 'block'
      }),
      controlBgColor: CONTROL_BG_COLOR,
      controlBorderWidth: CONTROL_BORDER_WIDTH,
      controlBorderStyle: CONTROL_BORDER_STYLE,
      controlBorderColor: CONTROL_BORDER_COLOR,
      controlBorderRadius: CONTROL_BORDER_RADIUS,
      ...MARGIN,
      ...PADDING,
    }
  }
}


export const formLayout = {
  layout: {
    type: 'prop-object',
    name: 'label.flow.formdesign.props.layout',
    visible: false,
    props: {
      size: SIZE,
      width: WIDTH,
      labelWidth: LABEL_WIDTH,
      labelAlign: LABEL_ALIGN,
      controlBgColor: CONTROL_BG_COLOR,
      controlBorderWidth: CONTROL_BORDER_WIDTH,
      controlBorderStyle: CONTROL_BORDER_STYLE,
      controlBorderColor: CONTROL_BORDER_COLOR,
    }
  }
}


export const layoutLayout = {
  layout: {
    type: 'prop-object',
    name: 'label.flow.formdesign.props.layout',
    visible: false,
    props: {
      size: SIZE,
      width: WIDTH,
      labelShown: LABEL_SHOWN,
      controlBgColor: CONTROL_BG_COLOR,
      controlBorderWidth: CONTROL_BORDER_WIDTH,
      controlBorderStyle: CONTROL_BORDER_STYLE,
      controlBorderColor: CONTROL_BORDER_COLOR,
      controlBorderRadius: CONTROL_BORDER_RADIUS,
      ...MARGIN,
      ...PADDING,
    }
  }
}

export const tableLayout = {
  layout: {
    type: 'prop-object',
    name: 'label.flow.formdesign.props.layout',
    visible: false,
    props: {
      size: SIZE,
      width: WIDTH,
      labelShown: LABEL_SHOWN,
      labelWidth: LABEL_WIDTH,
      labelAlign: LABEL_ALIGN,
      ...MARGIN,
      ...PADDING,
    }
  }
}


export const signLayout = {
  layout: {
    type: 'prop-object',
    name: 'label.flow.formdesign.props.layout',
    visible: false,
    props: {
      width: WIDTH,
      labelWidth: LABEL_WIDTH,
      labelShown: LABEL_SHOWN,
      display: pureProp({
        type: 'fd-radio',
        name: 'label.flow.formdesign.props.display',
        options: DISPLAY_OPTIONS,
        itemBtnStyle: 1,
        valueProp: 'key',
        labelProp: 'label',
        defaultValue: 'block'
      }),
      controlBgColor: CONTROL_BG_COLOR,
      controlBorderWidth: CONTROL_BORDER_WIDTH,
      controlBorderStyle: CONTROL_BORDER_STYLE,
      controlBorderColor: CONTROL_BORDER_COLOR,
      controlBorderRadius: CONTROL_BORDER_RADIUS,
      ...MARGIN,
      ...PADDING,
    }
  }
}


export const labelLayout = {
  layout: {
    type: 'prop-object',
    name: 'label.flow.formdesign.props.layout',
    visible: false,
    props: {
      width: WIDTH,
      controlBgColor: CONTROL_BG_COLOR,
      controlBorderWidth: CONTROL_BORDER_WIDTH,
      controlBorderStyle: CONTROL_BORDER_STYLE,
      controlBorderColor: CONTROL_BORDER_COLOR,
      controlBorderRadius: CONTROL_BORDER_RADIUS,
      ...MARGIN,
      ...PADDING,
    }
  }
}


