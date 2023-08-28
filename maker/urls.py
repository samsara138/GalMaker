from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from maker import views, authentications
from maker.editor_scripts import editor_helpers
from . import game_scripts

urlpatterns = [
    path('', views.index, name="index"),

    # Auth
    path("login", authentications.login_view, name="login"),
    path("logout", authentications.logout_view, name="logout"),
    path("register", authentications.register, name="register"),

    # Editor
    path("create_game", views.create_game, name="create_game"),
    path("create_new_game", views.create_new_game, name="create_new_game"),
    path("editor", views.editor, name="editor"),
    path("editor/<str:game_id>", views.editor, name="editor"),
    path("handle_game_save", editor_helpers.handle_game_save, name="handle_game_save"),
    path("get_game_data/<str:game_id>", editor_helpers.get_game_data, name="get_game_data"),
    path("get_node_data/<str:node_id>", editor_helpers.get_node_data, name="get_node_data"),

    # Game
    path("all_games", views.show_all_games, name="all_games"),
    path("game_view/<str:game_id>", views.game_view, name="game_view"),
    path("get_game_node_data/<str:game_id>/<str:node_id>", game_scripts.get_game_node_data, name="get_game_node_data"),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
