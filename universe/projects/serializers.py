from dataclasses import fields
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Player, Cell, Game, Ship, Board, GameError
import djangorestframework_camel_case


class PlayerModelSerialazer(ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'



class CellModelSerialazer(ModelSerializer):
    class Meta:
        model = Cell
        fields = '__all__'



class GameModelSerialazer(ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'



class ShipModelSerialazer(ModelSerializer):
    class Meta:
        model = Ship
        fields = '__all__'


class BoardModelSerialazer(ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'


class GameErrorModelSerialazer(ModelSerializer):
    class Meta:
        model = GameError
        fields = '__all__'
