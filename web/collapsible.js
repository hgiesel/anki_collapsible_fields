var CollapsibleFields = {
  /**
   * Actions on Fields
   **/
  getCollapsed: (field) => {
    return field.parentElement.classList.contains('is-collapsed')
  },

  setCollapsed: (field, collapsed) => {
    if (collapsed) {
      field.parentElement.classList.add('is-collapsed')
    }
    else {
      field.parentElement.classList.remove('is-collapsed')
    }
  },

  toggleCollapsed: (field) => {
    field.parentElement.classList.toggle('is-collapsed')
  },

  toggleCollapsedCurrent: () => {
    if (currentField) {
      const currentId = Number(currentField.id.match(CollapsibleFields.trailingNumberRegex))
      const target = document.getElementById(`name${currentId}`)
      CollapsibleFields.toggleCollapsed(target)
    }
  },

  isFieldEmpty: (field) => {
    return (
      field.innerHTML === "" || field.innerHTML == "<br>"
    )
  },

  /**
   * For Shortcuts
   **/
  isEmpty: (idx) => {
    return CollapsibleFields.isFieldEmpty(document.getElementById(`f${idx}`))
  },

  showIfNonEmpty: (idx) => {
    if (!CollapsibleFields.isEmpty(idx)) {
      CollapsibleFields.setCollapsed(document.getElementById(`name${idx}`), false)
    }
  },

  hide: (idx) => {
      CollapsibleFields.setCollapsed(document.getElementById(`name${idx}`), true)
  },

  /**
   * Loading
   **/
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
