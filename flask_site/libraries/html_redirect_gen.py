from flask import render_template


def html_redirect(url):
    """ Generates redirect pages using the meta refresh HTML tag.

    Proper redirects use 301 responses - this isn't possible with static sites. To circumvent, send HTML pages
    with meta refresh tags.

    :param str url: The URL to redirect to.
    :return: rendered page
    """
    return render_template('redirect.html', url=url)
