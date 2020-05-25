import pureProp from './pureProp'
import pureDefault from './pureDefault'
import { signLayout } from './layout-props'
import nextId from './next-id'

const getNumber = (str) => {
  const num = Number.parseFloat(str)
  return Number.isNaN(num) ? 0 : num
}

const showSignProps = { logic: 'and', rules: [{ prop: 'signEnable', operator: '=', condition: 1 }] }

const name = 'fd-sign'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.sign',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        signEnable: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.signEnable' }),
        // signAutoLoad: pureProp({
        //   type: 'fd-switch',
        //   name: 'label.flow.formdesign.props.signAutoLoad',
        //   show: showSignProps
        // }),
        signLineWidth: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.signLineWidth',
          min: 1,
          step: 1,
          max: 20,
          show: showSignProps
        }),
        signWords: pureProp({
          type: 'fd-counter', name: 'label.flow.formdesign.props.signWords',
          min: 1,
          step: 1,
          max: 4,
          onChange: (val, vo) => {
            let num = getNumber(vo.signHeight)
            num = Math.max(num, 30)
            num = Math.min(num, 90)
            vo.signHeight = num + 'px'
            vo.signWidth = num * val + 'px'
          },
          show: showSignProps
        }),
        signWidth: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.signWidth',
          required: 1,
          min: 30,
          max: 360,
          suffixFormat: 'px',
          onChange: (val, vo) => {
            let num = getNumber(val)
            num = Math.max(num, 30)
            num = Math.min(num, 360)
            vo.signWidth = num + 'px'
            vo.signHeight = num / vo.signWords + 'px'
          },
          show: showSignProps
        }),
        signHeight: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.signHeight',
          required: 1,
          min: 30,
          max: 90,
          suffixFormat: 'px',
          onChange: (val, vo) => {
            let num = getNumber(val)
            num = Math.max(num, 30)
            num = Math.min(num, 90)
            vo.signHeight = num + 'px'
            vo.signWidth = num * vo.signWords + 'px'
          },
          show: showSignProps
        })
      }
    },
    ...signLayout
  },
  defaultValue(config) {
    return pureDefault(config, {
      type: name,
      name: '签名',
      display: 'block',
      signWidth: '120px',
      signHeight: '40px',
      labelShown: 1,
      signEnable: 1,
      signWords: 3,
      signLineWidth: 6,
      id: nextId()
    })
  }
}
