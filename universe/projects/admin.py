from django.contrib import admin
from .models import Player, Cell, Game, Board, Ship, GameError

admin.site.register(Player)
admin.site.register(Cell)
admin.site.register(Game)
admin.site.register(Board)
admin.site.register(Ship)
admin.site.register(GameError)
