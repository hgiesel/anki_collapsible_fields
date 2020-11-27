from aqt import mw

from aqt.gui_hooks import (
    webview_will_set_content,
    webview_did_receive_js_message,
)

from aqt.editor import Editor
from aqt.schema_change_tracker import ChangeTracker

from .utils import collapse_by_default_keyword


mw.addonManager.setWebExports(__name__, r"(web|icons)/.*\.(js|css|png)")


def load_collapsible_icon_js(webcontent, context):
    if isinstance(context, Editor):
        addon_package = context.mw.addonManager.addonFromModule(__name__)
        base_path = f"/_addons/{addon_package}/web"

        webcontent.css.append(f"{base_path}/collapsible.css")
        webcontent.js.append(f"{base_path}/collapsible.js")


def sticky_getter_and_setter(handled, message, context: Editor):
    cmd = message.split(":", 1)

    if cmd[0] in "get_collapsed_by_default":
        model = context.note.model()
        idx = int(cmd[1])

        # when changing note type, the model will reflect the old model the first
        # time this function is called if the new model has more fields, than the
        # old one, there can be an IndexError
        try:
            fld = model["flds"][idx]
            default = (
                fld[collapse_by_default_keyword]
                if collapse_by_default_keyword in fld
                else False
            )
        except IndexError:
            default = False

        return (True, default)

    return handled


def init_webview():
    webview_will_set_content.append(load_collapsible_icon_js)
    webview_did_receive_js_message.append(sticky_getter_and_setter)
