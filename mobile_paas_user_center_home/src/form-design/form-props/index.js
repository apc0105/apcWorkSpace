import FdLabel from './fd-label'
import FdInput from './fd-input'
import FdNumber from './fd-number'
import FdSign from './fd-sign'
import FdCompute from './fd-compute'
import FdTextarea from './fd-textarea'
import FdCounter from './fd-counter'
import FdRadio from './fd-radio'
import FdCheckbox from './fd-checkbox'
import FdSwitch from './fd-switch'
import FdSelect from './fd-select'
import FdCascade from './fd-cascade'
import FdDate from './fd-date'
import FdAttach from './fd-attach'
import FdRich from './fd-rich'
import FdText from './fd-text'
import FormConfig from './form-config'
import FormInputDialog from './fd-input-dialog'
import FdLayout from './fd-layout'
import FdTable from './fd-table'
import FdGrid from './fd-grid'

export const layouts = [FdLayout.name, FdTable.name, FdGrid.name]
export const isLayout = type => layouts.indexOf(type) >= 0
export const isLayoutLayout = type => FdLayout.name == type
export const isGridLayout = type => FdGrid.name == type
export const isTableLayout = type => FdTable.name == type

export const isNumber = item => {
  if (item.type == FdNumber.name) {
    return true
  }
  if (item.type == FdInput.name && item.number == 1) {
    return true
  }
  return false
}

export default {
  [FdLabel.name]: FdLabel,
  [FdInput.name]: FdInput,
  [FdNumber.name]: FdNumber,
  [FdCompute.name]: FdCompute,
  [FdTextarea.name]: FdTextarea,
  [FdCounter.name]: FdCounter,
  [FdRadio.name]: FdRadio,
  [FdCheckbox.name]: FdCheckbox,
  // [FdSwitch.name]: FdSwitch,
  [FdSelect.name]: FdSelect,
  [FdCascade.name]: FdCascade,
  [FdDate.name]: FdDate,
  // [FdAttach.name]: FdAttach,
  // [FdRich.name]: FdRich,
  [FdText.name]: FdText,
  [FormConfig.name]: FormConfig,
  // [FormInputDialog.name]: FormInputDialog,

  [FdSign.name]: FdSign,

  [FdLayout.name]: FdLayout,
  [FdTable.name]: FdTable,
  [FdGrid.name]: FdGrid
}
