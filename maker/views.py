import json

from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from .models import *


def index(request):
    return render(request, "maker/index.html")


@csrf_exempt
@login_required
def create_game(request):
    games = request.user.games.all()
    context = {
        "games": games
    }
    return render(request, "maker/game_editor.html", context)


def create_new_game(request):
    game_obj = GalGame(name="New Game", owner=request.user)
    game_obj.save()
    request.user.games.add(game_obj)
    request.user.save()

    arges = {
        "game_id": game_obj.id
    }
    return HttpResponseRedirect(reverse('editor', kwargs=arges))


def editor(request, game_id):
    game_obj = GalGame.objects.get(id=game_id)

    context = {
        "game_obj": game_obj,
        "nodes": game_obj.nodes.all()
    }

    return render(request, "maker/create_node.html", context)


def show_all_games(request):
    game_objects = GalGame.objects.all()

    context = {
        "game_objects": game_objects,
    }
    return render(request, "maker/all_games.html", context)


def game_view(request, game_id):
    game_obj = GalGame.objects.get(id=game_id)
    context = {
        "game_obj": game_obj,
        "node_obj": game_obj.nodes.all()[0]
    }
    return render(request, "maker/game_view.html", context)




