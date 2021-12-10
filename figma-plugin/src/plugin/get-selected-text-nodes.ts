export function getSelectedTextNodes(nodes: readonly SceneNode[]): TextNode[] {
    let result: TextNode[] = [];
  
    nodes.forEach((node) => {
      if (isTextNode(node)) {
        result.push(node as TextNode);
      }
  
      const children = (node as ChildrenMixin).children;
      if (children) {
        const subSelected = getSelectedTextNodes(children);
        result = result.concat(subSelected);
      }
    });
  
    return result;
  }
  
  function isTextNode(node: SceneNode): boolean {
    return node.type === 'TEXT';
  }
