import pureProp from "./pureProp";
import pureDefault from './pureDefault'
import { tableLayout } from "./layout-props";
import nextId from "./next-id";

const TABLE_OPERATOR = [
  { key: 'add', label: 'operation.flow.formdesign.addRow', },
  { key: 'remove', label: 'operation.flow.formdesign.removeRow', },
]

const DEFAULT_COLUMN = { width: null, fixed: null, sum: 0, avg: 0, align: 'center' }

const name = 'fd-table'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.table',
  group: 'label.flow.formdesign.fdgroup.layout',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        tableDataUrl: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.tableDataUrl' }),
        // tableDataParam: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.tableDataParam' }),
        // defaultRows: pureProp({ type: 'fd-counter', name: 'label.flow.formdesign.props.defaultRows' }),
        cells: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.cells',
          min: 1,
          max: 99,
          width: '60%',
          onChange: (val, vo) => {
            if (!vo.cellElement) vo.cellElement = []
            const cellElement = vo.cellElement
            const value = []
            for (let i = 0; i < val; i++) {
              if (i < cellElement.length) {
                value.push(cellElement[i])
              } else {
                value.push({ ...DEFAULT_COLUMN })
              }
            }
            vo.cellElement = value
          }
        }),
        cellElement: pureProp({
          type: 'prop-columns',
          labelAlign: 'top',
          name: 'label.flow.formdesign.props.cellElement',
          marginLeft: "8px",
          marginRight: "8px",
        }),
        showIndex: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.showIndex' }),
        summaryText: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.summaryText' }),
        tableOperator: pureProp({
          type: 'fd-checkbox',
          name: 'label.flow.formdesign.props.tableOperator',
          valueProp: 'key',
          labelProp: 'label',
          options: TABLE_OPERATOR
        }),
      },
    },
    input: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.input',
      visible: false,
      props: {
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
      }
    },
    ...tableLayout,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '明细表格',
      size: 'mini',
      defaultRows: 1,
      cells: 2,
      columns: [{ ...DEFAULT_COLUMN }, { ...DEFAULT_COLUMN }],
      cellElement: [],
      // tableDataUrl: '/demo/tableDetail',
      width: '100%',
      labelAlign: 'top',
      labelShown: 0,
      showIndex: 1,
      summaryText: '合计',
      marginTop: '-1px',
      paddingRight: '0px',
      tableOperator: ['add', 'remove'],
      id: nextId(),
    })
  }
}
