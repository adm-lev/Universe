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

    def update(self, request, pk):
        instance = get_object_or_404(Cell, pk=pk)
        instance.hitted = True         
        instance.save()
        print('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg')
        if instance.have_ship:
            cur_ship = get_object_or_404(Ship, pk=request.data['ship_id'])
            cur_ship.health -= 1
            # if cur_ship.health == 0:
            #     cur_ship.is_alive = False           
            cur_ship.save()
        
        serializer_class = CellModelSerialazer(self.queryset, many=True, context={'request': request})
        return Response(serializer_class.data)


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
