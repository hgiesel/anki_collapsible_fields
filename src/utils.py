from aqt import mw


toggle_field_keyword = 'collapsibleFieldsToggleField'
toggle_all_keyword = 'collapsibleFieldsToggleAll'

collapse_by_default_keyword = 'collapsibleFieldsCollapseByDefault'


def get_toggle_field():
    return mw.pm.profile.get(toggle_field_keyword, 'F10')


def get_toggle_all():
    return mw.pm.profile.get(toggle_all_keyword, 'Shift+F10')
