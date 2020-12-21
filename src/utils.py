from typing import Any

from aqt import mw


class ProfileConfig:
    """Can be used for profile-specific settings"""

    def __init__(self, keyword: str, default: Any):
        self.keyword = keyword
        self.default = default

    @property
    def value(self) -> Any:
        return mw.pm.profile.get(self.keyword, self.default)

    @value.setter
    def value(self, new_value: Any):
        mw.pm.profile[self.keyword] = new_value

    def remove(self):
        try:
            del mw.pm.profile[self.keyword]
        except KeyError:
            # same behavior as Collection.remove_config
            pass


toggle_field = ProfileConfig("collapsibleFieldsToggleField", "F10")
toggle_all = ProfileConfig("collapsibleFieldsToggleAll", "Shift+F10")

collapse_by_default_keyword = "collapsibleFieldsCollapseByDefault"


def collapse_by_default(fld) -> bool:
    return (
        fld[collapse_by_default_keyword]
        if collapse_by_default_keyword in fld
        else False
    )


def is_text_empty(editor, text) -> bool:
    return editor.mungeHTML(text) == ""
