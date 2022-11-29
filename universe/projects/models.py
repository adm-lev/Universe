# from email.policy import default
# from statistics import mode
# from datetime import datetime as date
from django.db import models
from django.urls import reverse


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


