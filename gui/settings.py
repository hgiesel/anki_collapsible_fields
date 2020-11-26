from aqt import QDialog, QLayout, QKeySequence

from .forms.settings_ui import Ui_Settings

class Settings(QDialog):
    def __init__(self, addons, callback):
        super().__init__(parent=addons)

        self.ui = Ui_Settings()
        self.ui.setupUi(self)

        self.cb = callback

        self.layout().setSizeConstraint(QLayout.SetFixedSize)

    def setupUi(self, toggle_field_shortcut: str, toggle_all_shortcut: str):
        self.ui.toggleFieldShortcut.setKeySequence(QKeySequence(toggle_field_shortcut))
        self.ui.toggleAllShortcut.setKeySequence(QKeySequence(toggle_all_shortcut))

    def accept(self):
        toggle_field_shortcut = self.ui.toggleFieldShortcut.keySequence().toString()
        toggle_all_shortcut = self.ui.toggleAllShortcut.keySequence().toString()

        self.cb(toggle_field_shortcut, toggle_all_shortcut)
        super().accept()
