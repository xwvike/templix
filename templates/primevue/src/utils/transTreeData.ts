interface TreeNode {
  key: string;
  data: any;
  children: TreeNode[];
}
interface TransTreeDataOptions {
  keyField?: string;
  childrenField?: string;
}

export function transTreeData(source:any[], options: TransTreeDataOptions = {}): TreeNode[] {
  const { keyField = 'key', childrenField = 'children' } = options;
  let idCounter = 0;

  function generateKey() {
    return `key-${idCounter++}`;
  }

  function transformNode(node) {
    const key = node[keyField] || generateKey();
    const { [childrenField]: children, ...restData } = node;

    return {
      key,
      data: { ...restData },
      children: children ? transTreeData(children, options) : []
    };
  }

  return source.map(transformNode);
}