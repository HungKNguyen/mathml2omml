export function mtable (element, targetParent, previousSibling, nextSibling, ancestors) {
  const cellsPerRowCount = Math.max(...element.children.map(row => row.children.length))
  const targetElement = {
    name: 'm:m',
    type: 'tag',
    children: [{
      name: 'm:mPr',
      type: 'tag',
      children: [
        {
          name: 'm:baseJc',
          type: 'tag',
          attribs: {
            'm:val': 'center'
          }
        },
        {
          name: 'm:plcHide',
          type: 'tag',
          attribs: {
            'm:val': 'on'
          }
        },
        {
          name: 'm:mcs',
          type: 'tag',
          children: [
            {
              name: 'm:mc',
              type: 'tag',
              children: [
                {
                  name: 'm:mcPr',
                  type: 'tag',
                  children: [
                    {
                      name: 'm:count',
                      type: 'tag',
                      attribs: {
                        'm:val': cellsPerRowCount
                      }
                    },
                    {
                      name: 'm:mcJc',
                      type: 'tag',
                      attribs: {
                        'm:val': 'center'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }]
  }
  targetParent.children.push(targetElement)
  return targetElement
}

export function mtd (element, targetParent, previousSibling, nextSibling, ancestors) {
  // table cell
  const targetElement = {
    name: 'm:e',
    type: 'tag',
    children: []
  }
  targetParent.children.push(targetElement)
  return targetElement
}

export function mtr (element, targetParent, previousSibling, nextSibling, ancestors) {
  // table row
  const targetElement = {
    name: 'm:mr',
    type: 'tag',
    children: []
  }
  targetParent.children.push(targetElement)
  return targetElement
}
