from docx.shared import Pt, RGBColor
from docx.enum.style import WD_STYLE_TYPE


class Style:
    def __init__(
        self,
        name,
        font_name="Calibri (Body)",
        font_size=12,
        font_color=(0, 0, 0),
        font_bold=False,
        font_underline=False,
    ):
        self._name = name
        self._font_name = font_name
        self._font_size = Pt(font_size)
        self._font_color = RGBColor(font_color[0], font_color[1], font_color[2])
        self._font_bold = font_bold
        self._font_underline = font_underline
        self._character = WD_STYLE_TYPE.CHARACTER

    @property
    def font_name(self):
        return self._font_name

    @font_name.setter
    def font_name(self, value):
        self._font_name = value

    @property
    def font_size(self):
        return self._font_size

    @font_size.setter
    def font_size(self, value):
        self._font_size = Pt(value)

    @property
    def font_color(self):
        return self._font_color

    @font_color.setter
    def font_color(self, value):
        self._font_color = RGBColor(value)

    @property
    def font_bold(self):
        return self._font_bold

    @font_color.setter
    def font_bold(self, value):
        self._font_bold = value
