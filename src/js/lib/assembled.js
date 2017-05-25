import dot from 'dot';
import { TEMPLATE } from 'lib/config';

export default function Assembled(component, data) {
  if (typeof component !== 'string') {
      return;
  }
  const currentType = component.toUpperCase(),
    currentTemplate = TEMPLATE[currentType].replace(/(\n)+|(\r\n)+/g, "").trim();

  return dot.template(currentTemplate, null, {})(data);
}