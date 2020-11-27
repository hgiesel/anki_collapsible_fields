from itertools import cycle

from aqt.gui_hooks import editor_will_load_note, editor_did_init_shortcuts

from .utils import (
    get_toggle_field,
    get_toggle_all,
    collapse_by_default_keyword,
)


def toggle_field(editor):
    editor.web.eval("CollapsibleFields.toggleCollapsedCurrent()")


def show_nonempty(editor, id: int) -> None:
    editor.web.eval(f"CollapsibleFields.showIfNonEmpty({id})")


def hide_nonempty(editor, id: int) -> None:
    editor.web.eval(f"CollapsibleFields.hide({id})")


collapse_modes = cycle(
    [
        show_nonempty,
        hide_nonempty,
    ]
)


def toggle_all(editor):
    model = editor.note.model()
    next_mode = next(collapse_modes)

    for id, fld in enumerate(model["flds"]):
        # only targets collapse_by_default fields
        if (
            fld[collapse_by_default_keyword]
            if collapse_by_default_keyword in fld
            else False
        ):
            next_mode(editor, id)


def add_collapse_fields_shortcuts(cuts, editor):
    toggle_field_shortcut = get_toggle_field()
    toggle_all_shortcut = get_toggle_all()

    cuts.extend([
        (toggle_field_shortcut, lambda: toggle_field(editor)),
        (toggle_all_shortcut, lambda: toggle_all(editor), True),
    ])


def show_collapsible_icons(js, note, editor):
    newjs = js + "; CollapsibleFields.loadIcons(); "
    return newjs


def init_editor():
    editor_did_init_shortcuts.append(add_collapse_fields_shortcuts)
    editor_will_load_note.append(show_collapsible_icons)
