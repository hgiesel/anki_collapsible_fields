var CollapsibleFields = {
    /**
     * Actions on Fields
     **/
    getCollapsed: (idx) => {
        return getEditorField(idx).classList.contains('is-collapsed')
    },

    setCollapsed: (idx, collapsed) => {
        const className = 'is-collapsed'
        const editorField = getEditorField(idx)

        editorField.classList.toggle(className, collapsed)

        if (collapsed) {
            editorField.editingArea.setAttribute("tabindex", "-1")
        }
        else {
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

        editorField.classList.toggle(className, emptyStatus)
    },

    clearField: (idx) => {
        const editable = getEditorField(idx).editingArea.editable

        const sel = globalThis.getSelection()
        sel.removeAllRanges()
        sel.selectAllChildren(editable)

        if (sel.anchorOffset !== 0) {
            // force selection hack
            sel.selectAllChildren(editable)
        }

        globalThis.setFormat('delete')
    },

    toggleCollapsedCurrent: () => {
        const currentField = getCurrentField()

        if (!currentField) {
            return
        }

        CollapsibleFields.toggleCollapsed(currentField.ord)
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
        if (!document.body.hasAttribute("has-collapsible")) {
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

            document.body.setAttribute("has-collapsible", "")
        }

        const clearFieldIfModifiers = (idx) => (event) => {
            if (event.shiftKey && event.altKey) {
                CollapsibleFields.clearField(idx)
            }
        }

        forEditorField(options, (field, [collapsedByDefault, empty]) => {
            const ord = field.editingArea.ord

            if (!field.hasAttribute("has-collapsible")) {
                field.label.addEventListener(
                    'click',
                    clearFieldIfModifiers(field.editingArea.ord),
                )

                const collapseIcon = document.createElement('span')
                collapseIcon.classList.add('collapse-icon')

                collapseIcon.addEventListener('click', () => {
                    CollapsibleFields.toggleCollapsed(ord)
                })

                field.labelContainer.insertBefore(collapseIcon, field.label)
                field.setAttribute("has-collapsible", "")
            }

            CollapsibleFields.setCollapsed(ord, collapsedByDefault)
            CollapsibleFields.setEmptyStatus(ord, empty)
        })
    },
}
