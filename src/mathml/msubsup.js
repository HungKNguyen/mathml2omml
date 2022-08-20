import { walker } from '../walker.js'
import { getNary, getNaryTarget } from '../ooml/index.js'

export function msubsup (element, targetParent, previousSibling, nextSibling, ancestors) {
  // Sub + superscript
  if (element.children.length !== 3) {
    // treat as mrow
    return targetParent
  }

  ancestors = [...ancestors]
  ancestors.unshift(element)

  const base = element.children[0]
  const subscript = element.children[1]
  const superscript = element.children[2]

  let topTarget
  //
  // m:nAry
  //
  // Conditions:
  // 1. base text must be nary operator
  // 2. no accents
  const naryChar = getNary(base)
  if (
    naryChar &&
    element.attribs?.accent?.toLowerCase() !== 'true' &&
    element.attribs?.accentunder?.toLowerCase() !== 'true'
  ) {
    topTarget = getNaryTarget(naryChar, element, 'subSup')
    element.isNary = true
  } else {
    // fallback: m:sSubSup
    const baseTarget = {
      name: 'm:e',
      type: 'tag',
      children: []
    }

    walker(
      base,
      baseTarget,
      false,
      false,
      ancestors
    )
    topTarget = {
      type: 'tag',
      name: 'm:sSubSup',
      children: [
        {
          type: 'tag',
          name: 'm:sSubSupPr',
          children: [{
            type: 'tag',
            name: 'm:ctrlPr'
          }]
        },
        baseTarget
      ]
    }
  }

  const subscriptTarget = {
    name: 'm:sub',
    type: 'tag',
    children: []
  }
  const superscriptTarget = {
    name: 'm:sup',
    type: 'tag',
    children: []
  }
  walker(
    subscript,
    subscriptTarget,
    false,
    false,
    ancestors
  )
  walker(
    superscript,
    superscriptTarget,
    false,
    false,
    ancestors
  )
  topTarget.children.push(subscriptTarget)
  topTarget.children.push(superscriptTarget)
  if (element.isNary) {
    topTarget.children.push({ type: 'tag', name: 'm:e', children: [] })
  }
  targetParent.children.push(topTarget)
  // Don't iterate over children in the usual way.
}
