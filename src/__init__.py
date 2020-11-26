from .addon_manager import init_addon_manager
from .editor import init_editor
from .webview import init_webview
from .field_dialog import init_field_dialog


def init():
    init_addon_manager()
    init_editor()
    init_webview()
    init_field_dialog()
