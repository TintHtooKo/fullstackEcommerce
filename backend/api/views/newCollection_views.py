from .imports import *

@api_view(['GET'])
def NewCollection(request):
    new_collect = Product.objects.filter(collection=1)
    seri = ProductSerializer(new_collect,many=True)
    return Response(seri.data,status=200)