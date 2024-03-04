from .imports import *

@api_view(['GET'])
def ActionView(request):
    action = Action.objects.all()
    seri = ActionSerializer(action,many=True)
    return Response(seri.data,status=200)