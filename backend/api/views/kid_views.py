from .imports import *

@api_view(['GET'])
def KidView(request):
    kid = Product.objects.filter(category=3)
    seri = ProductSerializer(kid,many=True)
    return Response(seri.data,status=200)