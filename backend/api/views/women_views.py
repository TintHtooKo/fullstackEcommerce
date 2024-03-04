from .imports import *

@api_view(['GET'])
def WomenView(request):
    women = Product.objects.filter(category=2)
    seri = ProductSerializer(women,many=True)
    return Response(seri.data,status=200)