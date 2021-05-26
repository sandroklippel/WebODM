import os
from django.core.management.base import BaseCommand
from django.core.management import call_command

from app.scripts.extract_odm_strings import extract_odm_strings
from app.scripts.extract_plugin_manifest_strings import extract_plugin_manifest_strings
from app.scripts.extract_potree_strings import extract_potree_strings

root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("action", type=str, choices=['extract', 'build'])
        parser.add_argument("--safe", type=bool, required=False, help="Skip invalid languages")
        super(Command, self).add_arguments(parser)

    def handle(self, **options):
        with open(os.path.join(root, "LOCALES")) as f:
            locales = f.read().strip().split(" ")
        
        if options.get('action') == 'extract':
            print("Extracting .po files from Django/React")
            locale_params = ["--locale=%s" % l for l in locales]
            
            locale_dir = os.path.join(root, "locale")
            if not os.path.exists(locale_dir):
                os.mkdir(locale_dir)
            
            extract_potree_strings(
                os.path.join(root, "app", "static", "app", "js", "vendor", "potree", "build", "potree", "resources", "lang", "en", "translation.json"), 
                os.path.join(root, "app", "static", "app", "js", "translations", "potree_autogenerated.js")
            )
            extract_odm_strings(
                "https://raw.githubusercontent.com/OpenDroneMap/ODM/master/opendm/config.py",
                os.path.join(root, "app", "static", "app", "js", "translations", "odm_autogenerated.js")
            )
            extract_plugin_manifest_strings(
                os.path.join(root, "plugins"), 
                os.path.join(root, "app", "translations", "plugin_manifest_autogenerated.py")
            )

            call_command('makemessages', '--keep-pot', *locale_params, '--ignore=build', '--ignore=app/templates/app/registration/*')
            call_command('makemessages_djangojs', '--keep-pot', *locale_params, '-d=djangojs', '--extension=jsx', '--extension=js', '--ignore=build', '--ignore=app/static/app/js/vendor', '--ignore=app/static/app/bundles', '--ignore=node_modules', '--language=Python')