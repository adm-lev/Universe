from django.contrib.auth.models import User
from django.core.management import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):

        try:        
                User.objects.create_superuser('devlev', 'rheingoldgalaxy@gmail.com', 'Gfctrf-12')
        except Exception as err:
            print(err)
