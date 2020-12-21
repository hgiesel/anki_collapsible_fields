var CollapsibleFields = {
  trailingNumberRegex: /[0-9]+$/,

  /**
   * Actions on Fields
   **/
  getCollapsed: (fname) => {
    return fname.parentElement.classList.contains('is-collapsed')
  },

  setCollapsed: (fname, collapsed) => {
    const className = 'is-collapsed'

    const idx = fname.id.match(CollapsibleFields.trailingNumberRegex)
    const field = document.getElementById(`f${idx}`)

    if (collapsed) {
      fname.parentElement.classList.add(className)
      field.tabIndex = -1
    }
    else {
      fname.parentElement.classList.remove(className)
      field.tabIndex = ''
    }
  },

  toggleCollapsed: (fname) => {
    if (CollapsibleFields.getCollapsed(fname)) {
      CollapsibleFields.setCollapsed(fname, false)
    }
    else {
      CollapsibleFields.setCollapsed(fname, true)
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

  clearField: (idx) => {
    const field = document.getElementById(`f${idx}`)

    const sel = globalThis.getSelection()
    sel.removeAllRanges()
    sel.selectAllChildren(field)

    if (sel.anchorOffset !== 0) {
      // force selection hack
      sel.selectAllChildren(field)
    }

    console.log(
      sel.toString(),
      sel.toString().length,
      sel.anchorNode.id,
      sel.anchorOffset,
      sel.focusNode.id,
      sel.focusOffset,
    )

    globalThis.setFormat('delete')
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
  loadIcons: (options) => {

    // Clearing functionality for field name
    document.addEventListener('keydown', (event) => {
      if (event.shiftKey && event.altKey) {
        event.preventDefault()
        document.body.classList.add('collapsible-clear-mode')
      }
    })

    document.addEventListener('keyup', (event) => {
      if (!(event.shiftKey && event.altKey)) {
        document.body.classList.remove('collapsible-clear-mode')
      }
    })

    const clearFieldIfModifiers = (idx) => (event) => {
      if (event.shiftKey && event.altKey) {
        CollapsibleFields.clearField(idx)
      }
    }

    const fnames = document.querySelectorAll('.fname')

    for (const fname of fnames) {
      const idx = fname.id.match(CollapsibleFields.trailingNumberRegex)

      // Clearing functionality for field name
      const fieldname = fname.querySelector('.fieldname')

      // NOTE this will activate itself in probably 2.1.38 or 39
      if (fieldname) {
        fieldname.addEventListener('click', clearFieldIfModifiers(idx))
      }

      // Collapse functionality for icon
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
