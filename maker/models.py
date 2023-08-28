from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    games = models.ManyToManyField("GalGame", blank=True, related_name="made_games")


class GalGame(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, default="New Game")
    nodes = models.ManyToManyField("GalNode", blank=True, related_name="game_nodes")
    node_game_id = models.IntegerField(default=1)

    def get_node(self, ingame_id):
        return next(filter(lambda node: node.ingame_id == int(ingame_id), self.nodes.all()), None)

    def __str__(self):
        return str(self.id) + " => " + str(self.name)


class NodeState(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64, default="State Name")
    state = models.CharField(max_length=64, default="State")

    def __str__(self):
        return str(self.name) + " => " + str(self.state)


class GalNode(models.Model):
    id = models.AutoField(primary_key=True)
    ingame_id = models.IntegerField(blank=True, null=True)
    next = models.IntegerField(blank=True, null=True)

    name = models.CharField(max_length=64, default="New Node", null=True, blank=True)
    speaker = models.CharField(max_length=64, default="Speaker", null=True, blank=True)
    text = models.CharField(max_length=300, default="Spoken text", null=True, blank=True)

    background = models.ImageField(blank=True, null=True, upload_to="GalBackground")
    left_character = models.ImageField(blank=True, null=True, upload_to="GalBackground")
    left_character_hide = models.BooleanField(blank=True, default=False)
    right_character = models.ImageField(blank=True, null=True, upload_to="GalBackground")
    right_character_hide = models.BooleanField(blank=True, default=False)

    has_option = models.BooleanField(default=False)

    option_a = models.CharField(max_length=64, default="Speaker", null=True, blank=True)
    option_a_next = models.IntegerField(blank=True, null=True)
    option_a_req = models.ManyToManyField(NodeState, blank=True, related_name="option_a_requirement")
    option_a_chg = models.ManyToManyField(NodeState, blank=True, related_name="option_a_change")

    option_b = models.CharField(max_length=64, default="Speaker", null=True, blank=True)
    option_b_next = models.IntegerField(blank=True, null=True)
    option_b_req = models.ManyToManyField(NodeState, blank=True, related_name="option_b_requirement")
    option_b_chg = models.ManyToManyField(NodeState, blank=True, related_name="option_b_change")

    def update(self, name, speaker, text, next,
               background, background_clear, left_character, left_character_clear,
               right_character, right_character_clear, left_char_hide, right_char_hide,
               has_option, option_a, option_a_next, option_b, option_b_next):
        self.name = name
        self.speaker = speaker
        self.text = text
        self.next = next

        if background_clear == "true":
            self.background = None
        elif background:
            self.background = background

        if left_character_clear == "true":
            self.left_character = None
        elif left_character:
            self.left_character = left_character

        if right_character_clear == "true":
            self.right_character = None
        elif right_character:
            self.right_character = right_character

        self.left_character_hide = left_char_hide == "true"
        self.right_character_hide = right_char_hide == "true"

        self.has_option = has_option
        if has_option:
            self.option_a = option_a
            self.option_a_next = option_a_next
            self.option_b = option_b
            self.option_b_next = option_b_next

    def serialize(self):
        json = {
            "name": self.name,
            "speaker": self.speaker,
            "text": self.text,
            "next": self.next,
            "background": "",
            "leftCharacter": "",
            "rightCharacter": "",
            "has_option": self.has_option,
        }
        if self.background:
            json["background"] = self.background.name
            json["backgroundUrl"] = self.background.url
        if self.left_character:
            json["leftCharacter"] = self.left_character.name
            json["leftCharacterUrl"] = self.left_character.url
        json["leftCharacterHide"] = self.left_character_hide
        if self.right_character:
            json["rightCharacter"] = self.right_character.name
            json["rightCharacterUrl"] = self.right_character.url
        json["rightCharacterHide"] = self.right_character_hide
        if self.has_option:
            json["option_a"] = self.option_a
            json["option_a_next"] = self.option_a_next
            json["option_a_req"] = self.parse_state_to_list(self.option_a_req)
            json["option_a_chg"] = self.parse_state_to_list(self.option_a_chg)

            json["option_b"] = self.option_b
            json["option_b_next"] = self.option_b_next
            json["option_b_req"] = self.parse_state_to_list(self.option_b_req)
            json["option_b_chg"] = self.parse_state_to_list(self.option_b_chg)
        return json

    @staticmethod
    def parse_state_to_list(states):
        result = []
        for state in states.all():
            result.append(state.name)
            result.append(state.state)
        return result

    def __str__(self):
        return str(self.ingame_id) + " => " + str(self.name) + " => " + str(self.id)
