var CollapsibleFields = {
  /**
   * Actions on Fields
   **/
  getCollapsed: (fname) => {
    return fname.parentElement.classList.contains('is-collapsed')
  },

  setCollapsed: (fname, collapsed) => {
    const className = 'is-collapsed'

    if (collapsed) {
      fname.parentElement.classList.add(className)
    }
    else {
      fname.parentElement.classList.remove(className)
    }
  },

  setEmptyStatus: (fname, emptyStatus) => {
    const className = 'is-collapsed--empty'

    if (emptyStatus) {
      fname.parentElement.classList.add(className)
    }
    else {
      fname.parentElement.classList.remove(className)
    }
  },

  toggleCollapsed: (fname) => {
    fname.parentElement.classList.toggle('is-collapsed')
  },

  toggleCollapsedCurrent: () => {
    if (!currentField) {
      return
    }

    const currentId = Number(currentField.id.match(CollapsibleFields.trailingNumberRegex))
    const fname = document.getElementById(`name${currentId}`)
    CollapsibleFields.toggleCollapsed(fname)
  },

  /**
   * For Shortcuts
   **/
  showEmptyStatus: (idx, emptyStatus) => {
    CollapsibleFields.setEmptyStatus(document.getElementById(`name${idx}`), emptyStatus)
  },

  show: (idx) => {
    CollapsibleFields.setCollapsed(document.getElementById(`name${idx}`), false)
  },

  hide: (idx) => {
    CollapsibleFields.setCollapsed(document.getElementById(`name${idx}`), true)
  },

  /**
   * Loading
   **/
  trailingNumberRegex: /[0-9]+$/,

  loadIcons: (options) => {
    const fnames = document.querySelectorAll('.fname')

    for (const fname of fnames) {
      const idx = fname.id.match(CollapsibleFields.trailingNumberRegex)

      const collapseIcon = document.createElement('i')
      collapseIcon.classList.add('collapse-icon')

      fname.insertBefore(collapseIcon, fname.firstChild)

      collapseIcon.addEventListener('click', () => {
        CollapsibleFields.toggleCollapsed(fname)
      })

      const [
        collapsedByDefault,
        empty,
      ] = options[idx]

      CollapsibleFields.setCollapsed(fname, collapsedByDefault)
      CollapsibleFields.setEmptyStatus(fname, empty)
    }
  },
}
