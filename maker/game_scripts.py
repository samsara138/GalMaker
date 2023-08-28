import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from maker.models import *


def get_game_node_data(request, game_id, node_id):
    if request.method == "GET":
        game_obj = GalGame.objects.get(id=game_id)
        curr_node_obj = game_obj.get_node(node_id)
        return JsonResponse(curr_node_obj.serialize(), status=201)