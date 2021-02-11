var CollapsibleFields = {
  trailingNumberRegex: /[0-9]+$/,

  /**
   * Actions on Fields
   **/
  getCollapsed: (idx) => {
    return getEditorField(idx).labelContainer.classList.contains('is-collapsed')
  },

  setCollapsed: (idx, collapsed) => {
    const className = 'is-collapsed'
    const editorField = getEditorField(idx)

    if (collapsed) {
      editorField.labelContainer.classList.add(className)
      editorField.editingArea.setAttribute("tabindex", "-1")
    }
    else {
      editorField.labelContainer.classList.remove(className)
      editorField.editingArea.removeAttribute("tabindex")
    }
  },

  toggleCollapsed: (idx) => {
    if (CollapsibleFields.getCollapsed(idx)) {
      CollapsibleFields.setCollapsed(idx, false)
    }
    else {
      CollapsibleFields.setCollapsed(idx, true)
    }
  },

  setEmptyStatus: (idx, emptyStatus) => {
    const className = 'is-collapsed--empty'
    const editorField = getEditorField(idx)

    editorField.labelContainer.classList.toggle(className, emptyStatus)
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
    CollapsibleFields.setEmptyStatus(idx, emptyStatus)
  },

  show: (idx) => {
    CollapsibleFields.setCollapsed(idx, false)
  },

  hide: (idx) => {
    CollapsibleFields.setCollapsed(idx, true)
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

    forEditorField(options, (field, [collapsedByDefault, empty]) => {
      field.label.addEventListener(
        'click',
        clearFieldIfModifiers(field.editingArea.ord),
      )

      const ord = field.editingArea.ord

      if (!field.hasAttribute("has-collapsible")) {
        const collapseIcon = document.createElement('i')
        collapseIcon.classList.add('collapse-icon')

        collapseIcon.addEventListener('click', () => {
          CollapsibleFields.toggleCollapsed(ord)
        })

        field.labelContainer.insertBefore(collapseIcon, field.label)
        field.setAttribute("has-frozen", "")
      }

      CollapsibleFields.setCollapsed(ord, collapsedByDefault)
      CollapsibleFields.setEmptyStatus(ord, empty)
    })
  },
}
