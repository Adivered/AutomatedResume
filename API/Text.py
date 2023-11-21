class Text:
    def __init__(self, text, style):
        self._text = text
        self._style = style

    @property
    def text(self):
        return self._text  # Provide a property to access the text content

    @property
    def style(self):
        return self._style
