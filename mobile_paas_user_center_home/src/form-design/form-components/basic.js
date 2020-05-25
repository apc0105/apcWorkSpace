import Vue from 'vue'

import FdTitle from "./fd-title";
import FdLabel from "./fd-label";
import FdSign from "./fd-sign";
import FdTextarea from "./fd-textarea";
import FdInput from "./fd-input";
import FdNumber from "./fd-number";
import FdCompute from "./fd-compute";
import FdCounter from "./fd-counter";
import FdSwitch from "./fd-switch";
import FdSelect from "./fd-select";
import FdCascade from "./fd-cascade";
import FdColor from "./fd-color";
import FdRadio from "./fd-radio";
import FdCheckbox from "./fd-checkbox";
import FdDate from "./fd-date";
import FdRich from "./fd-rich";
import FdText from "./fd-text";
import FdAttach from "./fd-attach";
import FdInputDialog from "./fd-input-dialog";
import FdFormItem from "./fd-form-item";

const components = {
  [FdTitle.name]: FdTitle,
  [FdSign.name]: FdSign,
  [FdLabel.name]: FdLabel,

  [FdNumber.name]: FdNumber,
  [FdCompute.name]: FdCompute,
  [FdTextarea.name]: FdTextarea,
  [FdInput.name]: FdInput,
  [FdCounter.name]: FdCounter,
  [FdSwitch.name]: FdSwitch,
  [FdSelect.name]: FdSelect,
  [FdCascade.name]: FdCascade,
  [FdColor.name]: FdColor,
  [FdRadio.name]: FdRadio,
  [FdDate.name]: FdDate,
  [FdCheckbox.name]: FdCheckbox,
  [FdAttach.name]: FdAttach,
  [FdRich.name]: FdRich,
  [FdText.name]: FdText,
  [FdFormItem.name]: FdFormItem,
  [FdInputDialog.name]: FdInputDialog,
}

for (let name in components) {
  Vue.component(name, components[name])
}

export default components
