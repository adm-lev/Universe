from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import Player, Cell, Ship, Board, Game
from .serializers import PlayerModelSerialazer, CellModelSerialazer, ShipModelSerialazer
from .serializers import BoardModelSerialazer, GameModelSerialazer
# from .filters import  
from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, DjangoModelPermissions, IsAdminUser 
from rest_framework.permissions import IsAuthenticated, AllowAny, DjangoModelPermissionsOrAnonReadOnly
# from universe.settings import SECRET_KEY
# import logging
from rest_framework.decorators import permission_classes



class PlayerCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Player.objects.all()
    serializer_class = PlayerModelSerialazer
    permission_classes = [IsAuthenticated]

    # def destroy():
    #     pass

    # def create():
    #     pass

    # def update():
    #     pass


class CellCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Cell.objects.all()
    serializer_class = CellModelSerialazer
    permission_classes = [IsAuthenticated]

    # def destroy():
    #     pass

    # def create():
    #     pass

    def update():
        pass


class ShipCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Ship.objects.all()
    serializer_class = ShipModelSerialazer
    permission_classes = [IsAuthenticated]

    # def destroy():
    #     pass

    # def create():
    #     pass

    # def update():
    #     pass


class BoardCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Board.objects.all()
    serializer_class = BoardModelSerialazer
    permission_classes = [IsAuthenticated]

    # def destroy():
    #     pass

    # def create():
    #     pass

    # def update():
    #     pass


class GameCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Game.objects.all()
    serializer_class = GameModelSerialazer
    permission_classes = [IsAuthenticated]

    # def destroy():
    #     pass

    # def create():
    #     pass

    # def update():
    #     pass


# class TodoCustomViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin,
#     mixins.RetrieveModelMixin, GenericViewSet):
#     queryset = Todo.objects.all()
#     serializer_class = TodoModelSerialazer
#     filterset_class = TodoFilter
#     pagination_class = TodoLimitOffsetPagination
#     permission_classes = [IsAuthenticated]

#     def destroy(self, request, pk):
#         instance = get_object_or_404(Todo, pk=pk)            
#         instance.is_active = False        
#         instance.save()
#         todo = Todo.objects.all()       
#         serialilzer_class = TodoModelSerialazer(todo, many=True, context={'request': request})
#         return Response(serialilzer_class.data)