/**
 * Rules operators list
 *
 * eq - equal - igual
 * lt - low than - menor que
 * lte - low than equal - menor o igual que
 * gt - greater than - mayor que
 * gte - greater than equal - mayor o igual que
 * ne - not equal - distinto
 * in - in - dentro de
 * nin - not in - no dentro de
 */

type Actions = {
  type: "required" | "not required" | "show" | "hide" | "disable" | "enable";
  field: string;
};

type Rules = {
  conditions: {
    field: string;
    operator: "eq" | "lt" | "lte" | "gt" | "gte" | "ne" | "in" | "nin";
    value: string;
  }[];
  actions: Actions[];
  counter?: Actions[];
};

const parseRule = (rule: Rules, data: any) => {
  const { conditions, actions, counter } = rule;

  const isConditionMet = conditions?.every((condition) => {
    const { field, operator, value } = condition;
    const fieldValue = data[field];
    switch (operator) {
      case "eq":
        return fieldValue === value;
      case "lt":
        return fieldValue < value;
      case "lte":
        return fieldValue <= value;
      case "gt":
        return fieldValue > value;
      case "gte":
        return fieldValue >= value;
      case "ne":
        return fieldValue !== value;
      case "in":
        return fieldValue?.includes(value);
      case "nin":
        return !fieldValue?.includes(value);
      default:
        return false;
    }
  });

  if (isConditionMet) return actions;

  if (counter) return counter;

  return [];
};

const parseActions = (actions: Actions[]) => {
  if (!actions) return null;

  actions.forEach((element) => {
    switch (element.type) {
      case "required":
        document
          .getElementById(element.field)
          ?.getElementsByTagName("input")[0]
          .setAttribute("required", "true");
        break;
      case "show":
        document.getElementById(element.field)?.classList.remove("hidden");
        break;
      case "hide":
        document.getElementById(element.field)?.classList.add("hidden");
        break;
    }
  });
};

export { parseRule, parseActions };
export type { Rules, Actions };
