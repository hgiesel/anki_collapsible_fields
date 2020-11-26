var CollapsibleFields = {
  getCollapsed: (target) => {
    return target.parentElement.classList.contains('is-collapsed')
  },

  setCollapsed: (target, isCollapsed) => {
    if (isCollapsed) {
      target.parentElement.classList.add('is-collapsed')
    }
    else {
      target.parentElement.classList.remove('is-collapsed')
    }
  },

  toggleCollapsed: (target) => {
    CollapsibleFields.setCollapsed(target, !CollapsibleFields.getCollapsed(target))
  },

  toggleCollapsedCurrent: () => {
    if (currentField) {
      const currentId = Number(currentField.id.match(CollapsibleFields.trailingNumberRegex))
      CollapsibleFields.toggleCollapsed(currentId)
    }
  },

  trailingNumberRegex: /[0-9]+$/,

  loadIcons: () => {
    const fnames = document.querySelectorAll('.fname')

    for (const fname of fnames) {
      const idx = fname.id.match(CollapsibleFields.trailingNumberRegex)

      const collapseIcon = document.createElement('i')
      collapseIcon.classList.add('collapse-icon')

      fname.insertBefore(collapseIcon, fname.firstChild)

      collapseIcon.addEventListener('click', () => {
        CollapsibleFields.toggleCollapsed(fname)
      })

      pycmd(`get_collapsed_by_default:${idx}`, (isCollapsed) => {
        CollapsibleFields.setCollapsed(fname, isCollapsed)
      })
    }
  },
}
