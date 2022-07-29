function createModelFromData(paths) {
  let modelArray = [];
  let nodeCount = 0;
  paths.forEach((path) => {
    let parentRule = null;
    let parentNode = null;
    path.forEach((rule) => {
      let ruleNode = null;
      let ruleNameValue = getRuleNameAndValue(rule);
      let parentRuleNameValue = null;
      if (parentRule != null) {
        parentRuleNameValue = getRuleNameAndValue(parentRule);
      }
      console.log(ruleNameValue.name + ' ' + ruleNameValue.value);
      modelArray.forEach((node) => {
        if (parentRule == null) {
          if ((node.parent == null || node.parent == undefined) && node.name == ruleNameValue.name) {
            ruleNode = node;
            return;
          }
        } else if (node.parent == parentNode.key && node.name == ruleNameValue.name && node.path == parentRuleNameValue.value) {
          ruleNode = node;
          return;
        }
      });
      if (ruleNode == null) {
        nodeCount = nodeCount + 1;
        let name = ruleNameValue.name == "result" ? ruleNameValue.value : ruleNameValue.name
        ruleNode = {"name": name, "key": nodeCount};

        if (parentRule != null) {
          ruleNode.path = parentRuleNameValue.value;
          ruleNode.parent = parentNode.key;
        }
        if (ruleNameValue.name == "result") {
          ruleNode.color = "#ff8544";
        } else {
          ruleNode.color = "#ffffff";
        }

        modelArray.push(ruleNode);
      }
      parentRule = rule;
      parentNode = ruleNode;
    });
  });
  return modelArray;
}
function getRuleNameAndValue(rule){
  let ruleName = Object.entries(rule)[0][0];
  let ruleValue = Object.entries(rule)[0][1];
  return {"name":ruleName, "value":ruleValue}
}
