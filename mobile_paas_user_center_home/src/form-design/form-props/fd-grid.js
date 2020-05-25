import pureProp from "./pureProp";
import pureDefault from './pureDefault'
import { layoutLayout } from "./layout-props";
import nextId from "./next-id";

const initGridColumn = (vo, cells) => {
  if (!vo.cellElement) vo.cellElement = []
  const cellElement = vo.cellElement
  const value = []
  for (let i = 0; i < cells; i++) {
    if (i < cellElement.length) {
      value.push(cellElement[i])
    } else {
      value.push({ weight: 1, elementId: null })
    }
  }
  vo.cellElement = value
}

const initGridCells = (vo, rows, cells) => {
  const result = []
  if (!vo.gridElement) vo.gridElement = []
  let _index_ = 0
  for (let r = 0; r < rows; r++) {
    let rowCells = vo.gridElement[r] || []
    result[r] = []
    for (let c = 0; c < cells; c++) {
      let rowCell = rowCells[c]
      if (rowCell == null || rowCell == undefined) {
        rowCell = {
          rowSpan: 1,
          colSpan: 1,
          shown: 1,
          render: 1,
          rindex: r,
          cindex: c,
          index: _index_++,
        }
      }
      rowCell.index = _index_++
      result[r][c] = rowCell
    }
  }
  vo.gridElement = result
}

const name = 'fd-grid'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.grid',
  group: 'label.flow.formdesign.fdgroup.layout',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        cells: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.cells',
          min: 1,
          max: 999,
          width: '60%',
          onChange: (val, vo) => {
            const rows = vo.rows || 1
            const cells = val || 1
            initGridCells(vo, rows, cells)
            initGridColumn(vo, val)
          }
        }),
        rows: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.rows',
          min: 1,
          max: 999,
          width: '60%',
          onChange: (val, vo) => {
            const cells = vo.cells || 1
            const rows = val || 1
            initGridCells(vo, rows, cells)
          }
        }),
        cellElement: pureProp({
          type: 'prop-cells',
          labelAlign: 'top',
          name: 'label.flow.formdesign.props.cellElement',
          marginLeft: "8px",
          marginRight: "8px",
        }),
      },
    },
    ...layoutLayout,
  },
  defaultValue(config){
    const value = pureDefault(config, {
      type: name,
      cells: 3,
      rows: 3,
      cellElement: [{ weight: 1 }, { weight: 1 }, { weight: 1 }],
      gridElement: [],
      width: '100%',
      size: 'mini',
      labelShown: 0,
      controlBorderWidth: '1px',
      controlBorderStyle: 'solid',
      controlBorderColor: '#EBEEF5',
      controlBgColor: '#FFFFFF',
      marginTop: '-1px',
      marginBottom: '0px',
      _mergeFlag_: false,
      id: nextId(),
    })
    initGridCells(value, value.rows, value.cells)
    return value;
  }
}
