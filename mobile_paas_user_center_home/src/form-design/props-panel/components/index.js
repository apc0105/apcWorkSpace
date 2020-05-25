import components from "@/form-design/form-components";
import PropObject from "./prop-object";
import PropTable from "./prop-table";

export default {
  ...components,
  [PropObject.name]: PropObject,
  [PropTable.name]: PropTable,
}
