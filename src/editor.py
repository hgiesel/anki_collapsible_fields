from json import dumps
from itertools import cycle

from aqt.gui_hooks import editor_will_load_note, editor_did_init_shortcuts

from .utils import (
    toggle_field,
    toggle_all,
    collapse_by_default,
    is_text_empty,
)


def toggle_current(editor):
    editor.web.eval("CollapsibleFields.toggleCollapsedCurrent()")


def show_nonempty(editor, fld, id: int, text: str) -> None:
    if collapse_by_default(fld) and not is_text_empty(editor, text):
        editor.web.eval(f"CollapsibleFields.show({id})")


def hide_nonempty(editor, fld, id: int, _text: str) -> None:
    if collapse_by_default(fld):
        editor.web.eval(f"CollapsibleFields.hide({id})")


collapse_modes = cycle(
    [
        show_nonempty,
        hide_nonempty,
    ]
)


def toggle_fields(editor):
    note = editor.note
    model = note.model()
    fields = note.fields
    next_mode = next(collapse_modes)

    for id, fld in enumerate(model["flds"]):
        next_mode(editor, fld, id, fields[id])


def add_collapse_fields_shortcuts(cuts, editor):
    cuts.extend(
        [
            (toggle_field.value, lambda: toggle_current(editor)),
            (toggle_all.value, lambda: toggle_fields(editor), True),
        ]
    )


def show_collapsible_icons(js, note, editor):
    flds = note.model()["flds"]

    options = []
    for id, text in enumerate(note.fields):
        options.append(
            [
                collapse_by_default(flds[id]),
                is_text_empty(editor, text),
            ]
        )

    newjs = js + f"; CollapsibleFields.loadIcons({dumps(options)}); "

    return newjs


def init_editor():
    editor_did_init_shortcuts.append(add_collapse_fields_shortcuts)
    editor_will_load_note.append(show_collapsible_icons)
