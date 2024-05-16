import { handlerCategoryGroup } from "../app/category";
import { categoryGroup } from "./selectors";

const listener = () => {
  categoryGroup.addEventListener("click", handlerCategoryGroup);
};
export default listener;
