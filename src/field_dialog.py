from PyQt5 import QtWidgets
from typing import Optional

from aqt import AnkiQt
from aqt.fields import FieldDialog
from aqt.gui_hooks import state_did_reset

from anki.models import NoteType
from anki.hooks import wrap

from .utils import collapse_by_default, collapse_by_default_keyword


def init_collapsible_option(self):
    self.form.collapsible = QtWidgets.QCheckBox("Collapse by default")

    self.form._2.addWidget(
        self.form.collapsible,
        self.form._2.rowCount() + 1,
        1,
    )


def save_collapsible_option(self):
    # boilerplate
    if self.currentIdx is None:
        return
    idx = self.currentIdx
    fld = self.model["flds"][idx]

    fld[collapse_by_default_keyword] = self.form.collapsible.isChecked()
    self.change_tracker.mark_basic()


def load_collapsible_option(self, idx):
    # boilerplate
    self.currentIdx = idx
    fld = self.model["flds"][idx]

    self.form.collapsible.setChecked(collapse_by_default(fld))


def init_field_dialog():
    # setupSignals is called before executing QDialog
    FieldDialog.setupSignals = wrap(
        FieldDialog.setupSignals, init_collapsible_option, "after"
    )

    FieldDialog.saveField = wrap(
        FieldDialog.saveField, save_collapsible_option, "after"
    )
    FieldDialog.loadField = wrap(
        FieldDialog.loadField, load_collapsible_option, "after"
    )
