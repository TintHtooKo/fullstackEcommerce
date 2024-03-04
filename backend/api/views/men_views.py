from .imports import *

@api_view(['GET'])
def MenView(request):
    men = Product.objects.filter(category=1)
    seri = ProductSerializer(men,many=True)
    return Response(seri.data,status=200)