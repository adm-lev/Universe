# from django.shortcuts import render
# from django.shortcuts import render
# from django.views import generic
# from django.core.files.storage import FileSystemStorage
# import os
# import cv2
# import pytesseract
# from pdf2image import convert_from_path
# import fitz
# import docx
# from django.conf import settings
# from django.contrib.auth.decorators import login_required


# MEDIA = r'/home/devlev/portfolio/universe/media'



# def index(request):
#     """
#     :param request:
#     :return:
#     """

#     return render(request, 'file_converter/index.html')



# def load_files(request):
#     if request.method == 'POST' and request.FILES:
#         file = request.FILES['my_file1']
#         fs = FileSystemStorage()
#         filename = fs.save(os.path.join('converter', 'files', file.name), file)
#         file_url = fs.url(filename)
#         name = file.name
#         extention = file.name.split('.')
#         allow_image_list = ['bmp', 'dib', 'jpeg', 'jpg', 'jpe', 'jp2', 'png',
#                             'pbm', 'pgm', 'sr', 'ras', 'tiff', 'tif']
#         res_text = ''
#         doc_url = ''
#         message = ''

#         if extention[1].lower() == 'pdf':
#             file = fitz.open(os.path.join(settings.MEDIA_ROOT, 'converter/files/', name))

#             doc = docx.Document()

#             for pageNum, page in enumerate(file.pages(), start=1):
#                 text = page.get_text()
#                 doc.add_paragraph(text)
#                 doc.save(os.path.join(settings.MEDIA_ROOT, 'converter/files/', extention[0] + '.docx'))
#                 # if pageNum == 1:
#                 #     break
#             file_url = ''
#             doc_url = '/media/converter/files/' + extention[0] + '.docx'

#         elif extention[1].lower() in allow_image_list:

#             img = cv2.imread(os.path.join(settings.MEDIA_ROOT, 'converter/files/', name))
#             img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#             res_text = pytesseract.image_to_string(img)

#         else:
#             file_url = ''
#             message = 'Неподходящий формат файла :-('

#         return render(
#             request,
#             'file_converter/load_file.html',
#             {
#                 'file_url': file_url,
#                 'file_name': file.name,
#                 'doc_url': doc_url,
#                 'res_text': res_text,
#                 'message': message,
#             }

#         )
#     return render(request, 'file_converter/load_file.html')
