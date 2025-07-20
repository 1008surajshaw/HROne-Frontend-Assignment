import { TreeState } from '@/types'
import { createNode, addNodeToTree } from '@/utils/treeOperations'

export const createExampleJson = (): TreeState => {
  // Create a simple person object with nested address
  const rootNode = createNode('person', 'nesting')
  const nameNode = createNode('name', 'string', rootNode.id)
  const ageNode = createNode('age', 'number', rootNode.id)
  const addressNode = createNode('address', 'nesting', rootNode.id)
  const streetNode = createNode('street', 'string', addressNode.id)
  const cityNode = createNode('city', 'string', addressNode.id)
  const contactNode = createNode('contact', 'nesting', rootNode.id)
  const emailNode = createNode('email', 'string', contactNode.id)
  const phoneNode = createNode('phone', 'string', contactNode.id)
  
  let tree: TreeState = {
    nodes: {},
    rootNodes: []
  }
  
  // Add nodes to tree
  tree = addNodeToTree(tree, rootNode)
  tree = addNodeToTree(tree, nameNode)
  tree = addNodeToTree(tree, ageNode)
  tree = addNodeToTree(tree, addressNode)
  tree = addNodeToTree(tree, streetNode)
  tree = addNodeToTree(tree, cityNode)
  tree = addNodeToTree(tree, contactNode)
  tree = addNodeToTree(tree, emailNode)
  tree = addNodeToTree(tree, phoneNode)
  
  return tree
}