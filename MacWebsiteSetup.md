Based on advice from Gemini.

    sudo vi /etc/hosts

Added: 127.0.0.1   averemo.local

    sudo vi /etc/apache2/httpd.conf

Enabled vhosts.conf

    sudo vi /private/etc/apache2/extra/httpd-vhosts.conf

Added virtual hosts for localhost and averemo.local.
Removed dummy example hosts.

    chmod +x /Users/philburk
    chmod +x /Users/philburk/gitrepos
    chmod +x /Users/philburk/gitrepos/averemo.github.io
    sudo apachectl restart
