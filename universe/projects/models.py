# from email.policy import default
# from statistics import mode
# from datetime import datetime as date
from django.db import models
from django.urls import reverse


# *******************************Sea battle*****************************************



class Game (models.Model):

    name = models.CharField(max_length=64, unique=True, null=False, blank=False)
    time_start = models.DateTimeField(auto_now_add=True, help_text='Date created')
    time_finish = models.DateTimeField(auto_now_add=False, blank=True, null=True, help_text='Date updated')
    # players = models.ForeignKey()
    winner_name = models.CharField(max_length=64, blank=True, null=True, verbose_name='Winner name')
    num_turns = models.IntegerField(blank=True, null=True, verbose_name='Total turns')
    current_turn = models.CharField(max_length=64, blank=True, null=True, verbose_name='Current turn')
    if_winner = models.BooleanField(default=False, help_text='Have a winner')
    last_shot = models.CharField(max_length=64, blank=True, null=True, verbose_name='Last shot')

    class Meta:
        verbose_name = 'Game'
        verbose_name_plural = 'Games'
    def __str__(self) -> str:
        return f'{self.name}'


class Board (models.Model):

    
    team = models.CharField(max_length=64, blank=False, null=False, verbose_name='Team name')
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE, help_text='Game')

    class Meta:
        verbose_name = 'Board'
        verbose_name_plural = 'Boards'
    def __str__(self) -> str:
        return f'{self.game_id}-{self.team}'



class Ship (models.Model):

    # team = models.CharField(max_length=64, blank=False, null=False, verbose_name='Team name')
    board = models.ForeignKey(Board, on_delete=models.CASCADE, null=True, default=None, help_text='Game')
    ship_type = models.CharField(max_length=64, blank=False, null=False, verbose_name='Ship Type')
    max_health = models.IntegerField(blank=False, null=False, verbose_name='Total health')
    health = models.IntegerField(blank=False, null=False, verbose_name='Current health')
    is_alive = models.BooleanField(default=True, help_text='Is alive')
    # game_id = models.ForeignKey(Game, on_delete=models.CASCADE, null=True, default=None, help_text='Game')
    

    class Meta:
        verbose_name = 'Ship'
        verbose_name_plural = 'Ships'
    def __str__(self) -> str:
        # return f'{self.board}-{self.ship_type}({self.id})'
        return f'{self.id}'


class Cell (models.Model):

    x_coordinate = models.IntegerField(blank=False, null=True, verbose_name='X coordinate')
    y_coordinate = models.IntegerField(blank=False, null=True, verbose_name='Y coordinate')
    board = models.ForeignKey(Board, on_delete=models.CASCADE, null=True, default=None, help_text='Game')
    # player_name = models.ForeignKey(, on_delete=models.CASCADE, help_text='Game')
    # team = models.CharField(max_length=20, blank=False, null=False, verbose_name='Cell state')
    cell_state = models.IntegerField(blank=False, null=False, verbose_name='Cell state',
                                    help_text='0,1,2,3,4')
    have_ship = models.BooleanField(default=False, help_text='Have ship')
    ship_id = models.ForeignKey(Ship, on_delete=models.CASCADE, default=None, blank=True,
                                     null=True, help_text='Ship')
    hitted = models.BooleanField(default=False, help_text='Have hit')

    class Meta:
        verbose_name = 'Cell'
        verbose_name_plural = 'Cells'
    def __str__(self) -> str:
        return f'{self.board}-{self.x_coordinate}:{self.y_coordinate}'


class Player (models.Model):

    name = models.CharField(max_length=64, unique=True, help_text="Username", verbose_name='Username')
    # game_id = models.ForeignKey(Game, on_delete=models.CASCADE, blank=True, null=True, help_text='Game')
    board = models.ForeignKey(Board, on_delete=models.SET_NULL, blank=True, null=True, help_text='Game')
    # team = models.CharField(max_length=64, blank=True, null=True, verbose_name='Team name')
    total_games = models.IntegerField(blank=True, null=True, verbose_name='Total games')
    total_wins = models.IntegerField(blank=True, null=True, verbose_name='Total wins')

    class Meta:
        verbose_name = 'Player'
        verbose_name_plural = 'Players'
    def __str__(self) -> str:
        return f'{self.name}'


class GameError(models.Model):

     text = models.TextField(max_length=64, unique=False)
     time_start = models.DateTimeField(auto_now_add=True)

     def __str__(self) -> str:
        return f'{self.id}'





























# *******************************Sea battle*****************************************









# ------------------File converter------------------------------------------------


# class OperationFile(models.Model):
#     """
#     OperationFile
#     """

#     unit_file = models.FileField(verbose_name='Document', help_text='Load a document',
#                                  null=True, blank=True, upload_to='converter/files')
#     picture = models.ImageField(verbose_name='Image', help_text='Load an image',
#                                 upload_to='converter/images', null=True, blank=True)

#     # def __str__(self):
#     #     """
#     #
#     #     :return:
#     #     """
#     #     return self.title

#     def get_absolute_url(self):
#         """
#         :return:
#         """
#         return reverse('file', args=[str(self.id)])


