let nodeTemplate =
  new go.Node("Horizontal",
    { background: "#44CCFF" }).bind("background", "color")
    .add(new go.TextBlock("Default Text",
      { margin: 12, stroke: "black", font: "14px Arial, sans-serif" })
      .bind("text", "name"));
let textBlock = new go.TextBlock("Default Text",
  { margin: 12, stroke: "black", font: "14px Arial, sans-serif" }).bind("text", "path");
function createDiagram(id, model){
  const myDiagram = new go.Diagram("myDiagramDiv",
    {
      "undoManager.isEnabled": true,
      layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 })
    });
  myDiagram.nodeTemplate = nodeTemplate;
  let tempLinkTemplate = myDiagram.linkTemplate;
  tempLinkTemplate.add(textBlock);
  myDiagram.model = new go.TreeModel(model);
}
