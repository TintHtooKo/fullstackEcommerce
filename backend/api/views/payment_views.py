from .imports import *

@api_view(['GET'])
def PaymentView(request):
    payment = Payment.objects.all()
    seri = PaymentSerializer(payment,many=True)
    return Response(seri.data,status=200)