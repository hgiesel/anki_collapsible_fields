var CollapsibleFields = {
  getCollapsed: (target) => {
    return target.classList.contains('is-collapsed')
  },

  setCollapsed: (target, isCollapsed) => {
    if (isCollapsed) {
      target.classList.add('is-collapsed')
    }
    else {
      target.classList.remove('is-collapsed')
    }
  },

  toggleCollapsed: (idx) => {
    const fname = document.getElementById(`name${idx}`)
    CollapsibleFields.setCollapsed(fname, !CollapsibleFields.getCollapsed(fname))
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

      fname.addEventListener('click', () => {
        pycmd(`toggle_collapsed:${idx}`, (isCollapsed) => {
          CollapsibleFields.setCollapsed(fname, isCollapsed)
        })
      })

      pycmd(`get_collapsed_by_default:${idx}`, (isCollapsed) => {
        CollapsibleFields.setCollapsed(fname, isCollapsed)
      })
    }
  },
}
