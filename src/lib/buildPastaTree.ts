import type { PastaRow, PastaNode } from '../types/cadernos'

export function buildPastaTree(rows: PastaRow[]): PastaNode[] {
  const byId = new Map<string, PastaNode>(rows.map(row => [row.id, { ...row, children: [] }]))
  const roots: PastaNode[] = []

  for (const node of byId.values()) {
    if (node.parent_id && byId.has(node.parent_id)) {
      byId.get(node.parent_id)!.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}

export function findPastaNode(nodes: PastaNode[], id: string): PastaNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    const found = findPastaNode(node.children, id)
    if (found) return found
  }
  return null
}
