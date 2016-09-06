from __future__ import absolute_import
from webassets.filter import Filter


__all__ = ('CSSCompressor',)


class CSSCompressor(Filter):
    """Minifies CSS.
    Requires the ``csscompressor`` package (https://github.com/sprymix/csscompressor),
    which is a port of the YUI CSS compression algorithm.
    """

    name = 'csscompressor'

    def setup(self):
        try:
            from csscompressor import compress
        except ImportError:
            raise EnvironmentError('The "csscompressor" package is not installed.')
        else:
            self.compress = compress

    def output(self, _in, out, **kw):
        out.write(self.compress(_in.read()))
