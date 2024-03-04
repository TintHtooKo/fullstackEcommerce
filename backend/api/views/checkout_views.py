from .imports import *

@api_view(['GET'])
def CheckoutView(request):
    check = Checkout.objects.all()
    seri = CheckoutSerializer(check,many=True)
    return Response(seri.data,status=200)