from dataclasses import fields
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Player, Cell, Game, Ship, Board
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


# class UserModelSerialazer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'


# class ProjectModelSerialazer(ModelSerializer):
#     class Meta:
#         model = Project
#         fields = '__all__'


# class TodoModelSerialazer(ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = '__all__'