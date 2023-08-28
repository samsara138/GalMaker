import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from maker.models import *


@csrf_exempt
@login_required
def handle_game_save(request):
    if request.method == "PUT":
        # Rename
        data = json.loads(request.body)
        game_id = data["id"]
        new_name = data["newName"]
        game_obj = GalGame.objects.get(id=game_id)
        game_obj.name = new_name
        game_obj.save()
        return JsonResponse({"Code": "1"}, status=201)
    elif request.method == "POST":
        # Parse back the data
        node_id = request.POST.get("node_id")
        name = request.POST.get("name")
        game_id = request.POST.get("game_id")
        speaker = request.POST.get("speaker")
        text = request.POST.get("text")
        next_node = request.POST.get("next")
        background = request.FILES.get("background")
        left_character = request.FILES.get("leftCharacter")
        right_character = request.FILES.get("rightCharacter")
        background_clear = request.POST.get("backgroundClear")
        left_char_clear = request.POST.get("leftCharClear")
        left_char_hide = request.POST.get("leftCharHide")
        right_char_clear = request.POST.get("rightCharClear")
        right_char_hide = request.POST.get("rightCharHide")

        has_option = request.POST.get("has_option")
        option_a = request.POST.get("option_A")
        option_a_next = request.POST.get("option_A_next")
        option_b = request.POST.get("option_B")
        option_b_next = request.POST.get("option_B_next")
        option_a_req = request.POST.get("aReq")
        option_b_req = request.POST.get("bReq")
        option_a_chg = request.POST.get("aChg")
        option_b_chg = request.POST.get("bChg")

        next_node = None if next_node == "" else next_node

        has_option = has_option == "true"
        option_a_next = None if option_a_next == "" else option_a_next
        option_b_next = None if option_b_next == "" else option_b_next

        a_reqs = parse_list_to_states(option_a_req)
        b_reqs = parse_list_to_states(option_b_req)
        a_chg = parse_list_to_states(option_a_chg)
        b_chg = parse_list_to_states(option_b_chg)

        game_obj = GalGame.objects.get(id=game_id)

        if node_id != "-1":
            # Changing an existing node
            node = GalNode.objects.get(id=node_id)
            node.update(name, speaker, text, next_node,
                        background, background_clear, left_character, left_char_clear, right_character,
                        right_char_clear, left_char_hide, right_char_hide,
                        has_option, option_a, option_a_next, option_b, option_b_next)
            node.option_a_req.set(a_reqs)
            node.option_a_chg.set(a_chg)
            node.option_b_req.set(b_reqs)
            node.option_b_chg.set(b_chg)
            node.save()
        else:
            # Creating a new node
            node = GalNode(next=next_node, name=name, speaker=speaker, text=text, background=background,
                           left_character=left_character, right_character=right_character,
                           has_option=has_option, option_a=option_a, option_a_next=option_a_next,
                           option_b=option_b, option_b_next=option_b_next)

            node.ingame_id = game_obj.node_game_id
            node.save()
            game_obj.nodes.add(node)
            game_obj.node_game_id += 1
            game_obj.save()
            node.option_a_req.set(a_reqs)
            node.option_a_chg.set(a_chg)
            node.option_b_req.set(b_reqs)
            node.option_b_chg.set(b_chg)

        return JsonResponse({"Code": "1"}, status=201)


def parse_list_to_states(data):
    if not data:
        return []
    states = data.split(",")
    if len(states) == 1:
        return []
    result = []
    for i in range(0, len(states), 2):
        state = NodeState(name=states[i],
                          state=states[i + 1])
        state.save()
        result.append(state)
    return result


@csrf_exempt
@login_required
def get_node_data(request, node_id):
    if request.method == "GET":
        # Get node data
        node_obj = GalNode.objects.get(id=node_id)
        respond = node_obj.serialize()
        return JsonResponse(respond, status=201)
    if request.method == "PUT":
        # Remove node
        data = json.loads(request.body)
        game_id = data["game_id"]
        game_obj = GalGame.objects.get(id=game_id)
        node = GalNode.objects.get(id=node_id)
        game_obj.nodes.remove(node)
        node.delete()
        return JsonResponse({"Code": 1}, status=201)


@csrf_exempt
@login_required
def get_game_data(request, game_id):
    if request.method == "GET":
        # Get game data and it's nodes
        game_obj = GalGame.objects.get(id=game_id)
        node_meta = {}

        for node in game_obj.nodes.all():
            node_meta[node.ingame_id] = (node.name, node.id)

        respond = {
            "name": game_obj.name,
            "node_meta": node_meta,
        }
        return JsonResponse(respond, status=201)
    elif request.method == "PUT":
        # Delete game
        try:
            game_obj = GalGame.objects.get(id=game_id)
            if game_obj.owner == request.user:
                game_obj.owner.games.remove(game_obj)
                game_obj.delete()
        except:
            pass
        return JsonResponse({"Code": 1}, status=201)
