# Generated by Django 3.2.13 on 2022-09-26 04:15

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='NodeState',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='State Name', max_length=64)),
                ('state', models.CharField(default='State', max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='GalNode',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ingame_id', models.IntegerField(blank=True, null=True)),
                ('next', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, default='New Node', max_length=64, null=True)),
                ('speaker', models.CharField(blank=True, default='Speaker', max_length=64, null=True)),
                ('text', models.CharField(blank=True, default='Spoken text', max_length=300, null=True)),
                ('background', models.ImageField(blank=True, null=True, upload_to='GalBackground')),
                ('left_character', models.ImageField(blank=True, null=True, upload_to='GalBackground')),
                ('right_character', models.ImageField(blank=True, null=True, upload_to='GalBackground')),
                ('has_option', models.BooleanField(default=False)),
                ('option_a', models.CharField(blank=True, default='Speaker', max_length=64, null=True)),
                ('option_a_next', models.IntegerField(blank=True, null=True)),
                ('option_b', models.CharField(blank=True, default='Speaker', max_length=64, null=True)),
                ('option_b_next', models.IntegerField(blank=True, null=True)),
                ('option_a_chg', models.ManyToManyField(blank=True, related_name='option_a_change', to='maker.NodeState')),
                ('option_a_req', models.ManyToManyField(blank=True, related_name='option_a_requirement', to='maker.NodeState')),
                ('option_b_chg', models.ManyToManyField(blank=True, related_name='option_b_change', to='maker.NodeState')),
                ('option_b_req', models.ManyToManyField(blank=True, related_name='option_b_requirement', to='maker.NodeState')),
            ],
        ),
        migrations.CreateModel(
            name='GalGame',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='New Game', max_length=64)),
                ('node_game_id', models.IntegerField(default=1)),
                ('nodes', models.ManyToManyField(blank=True, related_name='game_nodes', to='maker.GalNode')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='games',
            field=models.ManyToManyField(blank=True, related_name='made_games', to='maker.GalGame'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
