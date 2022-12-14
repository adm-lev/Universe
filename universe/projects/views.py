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
    default_limit = 150


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


class CellCustomViewSet(GenericViewSet, mixins.RetrieveModelMixin):
    queryset = Cell.objects.all()
    serializer_class = CellModelSerialazer
    permission_classes = [IsAuthenticated]
    pagination_class = CommonLimitOffsetPagination
    

    # def destroy():
    #     pass

    # def create():
    #     pass

    # def list(self, request):
    #     print(request.data)

    #     return Response()



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
                print (inst)
                error = GameError(text=inst)
                error.save()         
        serializer_class = CellModelSerialazer(self.queryset, many=True, context={'request': request})
        return Response(serializer_class.data)


class ShipCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Ship.objects.all()
    serializer_class = ShipModelSerialazer
    permission_classes = [IsAuthenticated]
    pagination_class = CommonLimitOffsetPagination

    # def destroy():
    #     pass

    # def create():
    #     pass
    

    # def update():
    #     pass


class BoardCustomViewSet(GenericViewSet, mixins.ListModelMixin):
    queryset = Board.objects.all()
    serializer_class = BoardModelSerialazer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk):
        board = Board.objects.get(pk=pk)

        cells = Cell.objects.filter(board=board)
        ships = Ship.objects.filter(board=board)

        srz_ships = ShipModelSerialazer(ships, many=True, context={'request': request})
        srz_cells = CellModelSerialazer(cells, many=True, context={'request': request})

        # print({
        #     'ships': srz_ships.data,
        #     'cells': srz_cells.data
        # })

        board_info = {
            'ships': srz_ships.data,
            'cells': srz_cells.data
        }
        

        return Response(board_info)

    # def destroy():
    #     pass

    # def create():
    #     pass

    def update(self, request, pk):
        # current_board = get_object_or_404(Board, pk=pk)

        cells = Cell.objects.filter(board=pk)
        # print(cells)

        # cur_cell = cells.get(x_coordinate=2, y_coordinate=10)
        # print(cur_cell.cell_state)
        # print(cur_cell.have_ship)
        for i in request.data:
            # print(i)
            cur_ship = Ship.objects.get(id=i)
            print(cur_ship)
            for j in request.data[i]:
                cur_cell = cells.get(x_coordinate=j[0], y_coordinate=j[1])
                cur_cell.cell_state = 1
                cur_cell.have_ship = True
                cur_cell.ship_id = cur_ship
                cur_cell.save()
                print(cur_cell)
            # print('---')
            
            

        return Response({})






class GameCustomViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Game.objects.all()
    serializer_class = GameModelSerialazer
    permission_classes = [IsAuthenticated]

    # def destroy():
    #     pass

    
    def create(self, request):
        try:
            time = int(datetime.now().timestamp())           

            #  Find the player in Player model or create new one with requested name
            try:
                player = Player.objects.get(name=request.data['player'])           
            except:
                player = Player(name=request.data['player'])
       
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
            self.create_cells(10, board_1)
            self.create_cells(10, board_2)        
            
            # Create some ships for the each board
            self.create_fleet(board_1)
            self.create_fleet(board_2)

        except Exception as err:          
            print (err)
            error = GameError(text=err)
            error.save()

        #  Filter cells, ships by their board and compilling their serializers
        team_one_cells = Cell.objects.filter(board=board_1)
        # team_two_cells = Cell.objects.filter(board=board_2)
        boards = Board.objects.filter(game_id=game)
        ships_1 = Ship.objects.filter(board=board_1)
        # ships_2 = Ship.objects.filter(board=board_2)
        srz_game = GameModelSerialazer(game, many=False, context={'request': request})
        # srz_boards = BoardModelSerialazer(boards, many=True, context={'request': request})
        srz_board = BoardModelSerialazer(board_1, many=False, context={'request': request})
        srz_ships_1 = ShipModelSerialazer(ships_1, many=True, context={'request': request})
        # srz_ships_2 = ShipModelSerialazer(ships_2, many=True, context={'request': request})
        srz_cells_1 = CellModelSerialazer(team_one_cells, many=True, context={'request': request})
        # srz_cells_2 = CellModelSerialazer(team_two_cells, many=True, context={'request': request})
        

        # print({
        #     "game":srz_game.data,
        #     "cells1":srz_cells_1.data,
        #     # "cells2":srz_cells_2.data,
        #     "boards":srz_boards.data,
        #     "ships1":srz_ships_1.data,
        #     # "ships2":srz_ships_2.data
        # })

        all_game_info = {
            "game":srz_game.data,
            "board":srz_board.data,
            "cells1":srz_cells_1.data,
            # "cells2":srz_cells_2.data,            
            "ships1":srz_ships_1.data,
            # "ships2":srz_ships_2.data
        }
        
                
        
        # print(serializer_class.data)
        return Response(all_game_info)

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
            'battleship(4)': 4,
            'cruiser(3)': 3,
            'destroyer(2)': 2,
            'barque(1)': 1,
        }
        ship = Ship(board=board,ship_type=type,max_health=types[type],health=types[type])
        ship.save()


    def create_fleet(self, board):
        
        self.create_ship(board, 'battleship(4)')            
        for _ in range(2):
            self.create_ship(board, 'cruiser(3)')            
        for _ in range(3):
            self.create_ship(board, 'destroyer(2)')            
        for _ in range(4):
            self.create_ship(board, 'barque(1)')
            



class GameErrorModelWiewSet(ModelViewSet):
    queryset = GameError.objects.all()
    serializer_class = GameErrorModelSerialazer
    permission_classes = [IsAuthenticated]
    # pagination_class = TodoLimitOffsetPagination


    

    