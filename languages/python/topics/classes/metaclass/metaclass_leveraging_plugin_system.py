

# magic stuff
class PluginMount(type):
    def __init__(cls, name, bases, attrs):
        if not hasattr(cls, 'plugins'):
            # This branch only executes when processing the mount point itself.
            # So, since this is a new plugin type, not an implementation, this
            # class shouldn't be registered as a plugin. Instead, it sets up a
            # list where plugins can be registered later.
            cls.plugins = []
        else:
            # This must be a plugin implementation, which should be registered.
            # Simply appending it to the list is all that's needed to keep
            # track of it later.
            cls.plugins.append(cls)


class PasswordValidator(metaclass=PluginMount):
    """
    Plugins extending this class will be used to validate passwords.
    Valid plugins must provide the following method.
    validate(self, password)
    Receives a password to test, and either finishes silently or raises a
    ValueError if the password was invalid. The exception may be displayed
    to the user, so make sure it adequately describes what's wrong.
    """
    @staticmethod
    def is_valid_password(password):
        """
        Returns True if the password was fine, False if there was a problem.
        """
        for plugin in PasswordValidator.plugins:
            try:
                plugin.validate(password)
            except ValueError:
                return False
        return True


class MinimumLength(PasswordValidator):
    @staticmethod
    def validate(password):
        """Raises ValueError if the password is too short."""
        if len(password) < 6:
            raise ValueError('Passwords must be at least 6 characters.')


passwd = 'abcde'
if PasswordValidator.is_valid_password(passwd):
    print('ok')
else:
    print('nok')
