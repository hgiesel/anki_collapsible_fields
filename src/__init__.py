from .webview import init_webview
from .editor import init_editor
from .addon_manager import init_addon_manager


def init():
    init_addon_manager()
    init_webview()
    init_editor()
