from json import dumps

from aqt import mw

from aqt.gui_hooks import (
    webview_will_set_content,
    webview_did_receive_js_message,
)

from aqt.editor import Editor, munge_html
from aqt.schema_change_tracker import ChangeTracker

from .utils import collapse_by_default_keyword


mw.addonManager.setWebExports(__name__, r"(web|icons)/.*\.(js|css|png)")


def load_collapsible_icon_js(webcontent, context):
    if isinstance(context, Editor):
        addon_package = context.mw.addonManager.addonFromModule(__name__)
        base_path = f"/_addons/{addon_package}/web"

        webcontent.css.append(f"{base_path}/collapsible.css")
        webcontent.js.append(f"{base_path}/collapsible.js")


def handle_collapsible_messages(handled, cmd, context):
    if isinstance(context, Editor):
        editor: Editor = context

        if cmd.startswith("key"):
            type, ord, _nid, txt = cmd.split(":", 3)

            is_empty = dumps(munge_html(txt, editor) == "")
            editor.web.eval(f"CollapsibleFields.showEmptyStatus({ord}, {is_empty})")

    return handled


def init_webview():
    webview_will_set_content.append(load_collapsible_icon_js)
    webview_did_receive_js_message.append(handle_collapsible_messages)
