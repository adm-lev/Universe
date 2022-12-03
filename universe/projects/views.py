from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import Player, Cell, Ship, Board, Game, GameError
from .serializers import PlayerModelSerialazer, CellModelSerialazer, ShipModelSerialazer
from .serializers import BoardModelSerialazer, GameModelSerialazer, GameErrorModelSerialazer
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
from datetime import datetime
from rest_framework import status


class CommonLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 100


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
    pagination_class = CommonLimitOffsetPagination

    # def destroy():
    #     pass

    # def create():
    #     pass

    def update(self, request, pk):
        instance = get_object_or_404(Cell, pk=pk)
        instance.hitted = True         
        instance.save()
        
        if instance.have_ship:
            try:            
                ship = instance.ship_id
                ship.health -= 1
                if ship.health < 1:
                    ship.is_alive = False
                ship.save()    
            except Exception as inst:           
                print(inst)          
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

    
    def create(self, request):
        try:
            # print(request.data)
            # serializer = GameModelSerialazer(name='33333')
            
            # if serializer.is_valid():
            #     serializer.save()
            #     return Response(serializer.data, status=status.HTTP_201_CREATED)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            



            time = int(datetime.now().timestamp())
            err = GameError(text=request.data['player'])
            err.save()
            err = GameError(text=request.data['player'])
            err.save()
            #  Find the player in Player model or create new one with requested name
            try:
                player = Player.objects.get(name=request.data['player'])
            # if not player:
            except:
                player = Player(name=request.data['player'])
            # player = Player.objects.get(name=request['player'])
            # if not player:
            #     player = Player(name=request['player'])
            #  Create a new game with unique name
            game = Game(name=time)
            game.save() 
            # game = Game(name=time)
            # game.save()        

            #  Create two new boards for the game        
            board_1 = self.create_board('team1', game)
            board_2 = self.create_board('team2', game)
            #  Bind first team to the player. The second board is still empty!
            player.board = board_1
            player.save()    
                    
            #  Create some cells for the each board
            self.create_cells(5, board_1)
            self.create_cells(5, board_2)
        
            #  Filter cells by their board
            team_one_cells = Cell.objects.filter(board=board_1)
            team_two_cells = Cell.objects.filter(board=board_2)

            for _ in range(2):
                self.create_ship(board_1, 'cruiser')
                self.create_ship(board_2, 'cruiser')
            for _ in range(4):
                self.create_ship(board_1, 'destroyer')
                self.create_ship(board_2, 'destroyer')
        except Exception as err:
            # serializer_class = GameModelSerialazer(self.queryset, many=True, context={'request': request})
            # return Response(data=err, status=501)
            print (err)
            error = GameError(text=err)
            error.save()



        
                
        serializer_class = GameModelSerialazer(game, many=False, context={'request': request})
        print(serializer_class.data)
        return Response(serializer_class.data)

    # def update():
    #     pass


    def create_cells(self, max, board):
        max +=1
        for i in range (1,max):
            for j in range (1,max):
                cell = Cell(x_coordinate=i, y_coordinate=j, board=board, cell_state=0)
                cell.save()


    def create_board(self, team, game):
        board = Board(team=team, game_id=game)
        board.save()
        return board


    def create_ship(self, board, type):
        types = {
            'battleship': 4,
            'cruiser': 3,
            'destroyer': 2,
            'barque': 1,
        }
        ship = Ship(board=board,ship_type=type,max_health=types[type],health=types[type])
        ship.save()





class GameErrorModelWiewSet(ModelViewSet):
    queryset = GameError.objects.all()
    serializer_class = GameErrorModelSerialazer
    permission_classes = [IsAuthenticated]
    # pagination_class = TodoLimitOffsetPagination


    

    