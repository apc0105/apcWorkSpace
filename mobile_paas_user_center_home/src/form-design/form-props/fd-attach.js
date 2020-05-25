import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const ATTACH_IMAGE_DISPLAY_OPTIONS = [
  { key: 'text', label: 'label.flow.formdesign.attachImageDisplays.text', },
  { key: 'picture-card', label: 'label.flow.formdesign.attachImageDisplays.pictureCard', },
  { key: 'picture', label: 'label.flow.formdesign.attachImageDisplays.pictureList', },
]
const name = 'fd-attach'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.attach',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        placeholder: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.placeholder', required: 1 }),
      },
    },
    input: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.input',
      visible: false,
      props: {
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        attachModule: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.attachModule', required: 1 }),
        attachMultiple: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.attachMultiple' }),
        attachLimit: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.attachLimit',
          step: 1,
          min: 0,
          max: 999999
        }),
        attachImage: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.attachImage' }),
        attachImageDisplay: pureProp({
          type: 'fd-radio',
          name: 'label.flow.formdesign.props.attachImageDisplay',
          options: ATTACH_IMAGE_DISPLAY_OPTIONS,
          required: 1,
          itemBtnStyle: 1,
          valueProp: 'key',
          labelProp: 'label',
          defaultValue: 'left'
        }),
        attachImageWidth: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.attachImageWidth',
          number: 1,
          required: 1,
          suffixFormat: 'px',
          show: { logic: 'and', rules: [{ prop: 'attachImage', operator: '=', condition: 1 }] },
        }),
        attachImageHeight: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.attachImageHeight',
          number: 1,
          required: 1,
          suffixFormat: 'px',
          show: { logic: 'and', rules: [{ prop: 'attachImage', operator: '=', condition: 1 }] },
        }),
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
      }
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '附件',
      readonly: 0,
      required: 0,
      attachLimit: 9,
      attachImage: 0,
      attachImageDisplay: ATTACH_IMAGE_DISPLAY_OPTIONS[0].key,
      attachImageWidth: 96,
      attachImageHeight: 96,
      id: nextId(),
    })
  }
}
